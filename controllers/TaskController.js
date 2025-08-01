// Add at the top
const User = require('../models/User')

// Assign Task Controller
const assignTask = async (req, res) => {
  try {
    const { userId } = req.params; // employee ID
    const { description, status, lastDate } = req.body; // task info

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    if (!lastDate) {
      return res.status(400).json({ success: false, message: "Last Date is required" });
    }

    const newTask = {
      description,
      status: status || 'awaited',
      lastDate,
      assignedAt: new Date()
    };


    user.tasks.push(newTask);
    await user.save();
    console.log('task successfully added')
    return res.status(200).json({ success: true, message: 'Task assigned successfully', user });
  } catch (error) {
    console.error('Assign Task Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Update Task Status Controller
const updateTaskStatus = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const { status } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    task.status = status;
    await user.save();

    return res.status(200).json({ success: true, message: 'Task status updated', task });
  } catch (error) {
    console.error('Update Task Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  const { userId, taskId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.tasks = user.tasks.filter(task => task._id.toString() !== taskId);
    await user.save();

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Submit Task by Employee
const submitTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const { submissionLink } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const task = user.tasks.id(taskId);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    // Update task
    task.submissionLink = submissionLink;
    task.status = "submitted";

    await user.save();

    return res.status(200).json({ success: true, message: "Task submitted", task });
  } catch (error) {
    console.error("Submit Task Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




module.exports = {
  assignTask,
  updateTaskStatus,
  deleteTask,
  submitTask
};
