const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["awaited", "submitted", "approved",'rejected'],
    default: "awaited"
  },
  assignedAt: {
    type: Date,
    default: Date.now
  },
  lastDate: {
    type: Date, 
    required: true
  },
  submissionLink: {
    type: String,
    default:''
  }
},{timestamps:true});


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    fullName: String,
    phone: String,
    address: String,
    nationalId: String,
    department: String,
    designation: String,
    employmeeType: String,
    status: { type: String, default: "Active" },
    experience: Number,
    salary: Number,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    empId: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    tasks: [taskSchema]

}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)