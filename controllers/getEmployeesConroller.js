const User = require('../models/User')



// Auto-Reject Expired Awaited Tasks
const autoRejectExpiredTasks = async () => {
    try {
        const users = await User.find({ 'tasks.status': 'awaited' });

        const now = new Date();

        for (let user of users) {
            let modified = false;

            user.tasks.forEach(task => {
                if (task.status === 'awaited' && new Date(task.lastDate) < now) {
                    task.status = 'rejected';
                    modified = true;
                }
                if (task.status === 'submitted' && new Date(task.lastDate) < now) {
                    task.status = 'approved';
                    modified = true;
                }
            });

            if (modified) {
                await user.save();
            }
        }

        console.log('✅ Auto-rejected expired awaited tasks.');
    } catch (error) {
        console.error('❌ Error in autoRejectExpiredTasks:', error.message);
    }
};


const getAllEmployees = async (req, res) => {
    try {
        await autoRejectExpiredTasks();

        const users = await User.find({ role: { $ne: 'admin' } });

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.log('error fetching users', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
        });
    }
};






module.exports = { getAllEmployees }

