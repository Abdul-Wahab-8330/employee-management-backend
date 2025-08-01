const express = require('express');
const router = express.Router();
const { deleteUser } = require('../controllers/DeleteUserController');

// DELETE route
router.delete('/users/:userId', deleteUser);

module.exports = router;
