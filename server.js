const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const authRoutes = require('./routes/authRoutes')
const getUserRoutes = require('./routes/GetUserRoutes')
const taskRoutes = require('./routes/taskRoutes')
const deleteUserRoutes = require('./routes/deleteUserRoutes')
//load environment variables from .env
dotenv.config()

const app = express()

app.use(cors({
  origin: "https://xtech-employee-management-system.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/employees', getUserRoutes)
app.use('/api/task', taskRoutes)
app.use('/api', deleteUserRoutes)


const PORT = process.env.PORT || 5000;

//Connect DataBase
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.log(error))



app.get('/', (req, res) => {
    res.send('employee management api')
})



<<<<<<< HEAD
app.listen(PORT,'0.0.0.0', () => {
=======
app.listen(PORT, '0.0.0.0' () => {
>>>>>>> 3a1f92951264717c91f144a9f760fcdfa7d16aa9
    console.log(`Server running on http://localhost:${PORT}`)
})
