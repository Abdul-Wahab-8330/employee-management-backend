const express = require('express')

const {getAllEmployees} = require('../controllers/getEmployeesConroller')

const router = express.Router()

router.get('/all', getAllEmployees)

module.exports = router;