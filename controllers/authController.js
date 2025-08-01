const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//signup controller
const signup = async (req, res) => {
    try {

        const { userName, email, password, fullName, phone, gender, nationalId, address, empType, designation, department, status, salary } = req.body;

        const existingUser = await User.findOne({ $or: [{ userName }, { email }] })
        if (existingUser) {
            console.log("User already exists:", existingUser);
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            role: 'user',
            fullName,
            phone,
            gender,
            nationalId,
            address,
            empType,
            designation,
            department,
            status,
            salary,
        })

        newUser.empId = newUser._id.toString()
        await newUser.save()

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}


//login controller

const login = async (req, res) => {
    try {

        const { userName, password } = req.body;

        const user = await User.findOne({ userName })
        if (!user) {
            console.log('Login failed! User does not exist')
            return res.status(404).json({
                success: false,
                message: 'User does not exist'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            console.log('Invalid credentials')
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const token = jwt.sign({ id: user._id, role: user.role, userName: user.userName, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        console.log('Login Successful!')
        res.status(200).json({
            success: true,
            message: 'Loggedin successfully',
            token,
            user: {
                userName: user.userName,
                email: user.email,
                role: user.role,
                empId: user.empId,
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

module.exports = { signup, login }