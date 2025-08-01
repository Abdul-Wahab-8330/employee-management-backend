const express = require('express')

const router = express.Router()

const {assignTask, updateTaskStatus, deleteTask, submitTask} = require('../controllers/TaskController')

router.post('/assign/:userId', assignTask)
router.put('/update/:userId/:taskId', updateTaskStatus)
router.delete('/delete/:userId/:taskId', deleteTask);
router.put('/submit/:userId/:taskId', submitTask);


module.exports = router