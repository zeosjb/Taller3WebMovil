const express = require('express')
const dotenv =  require('dotenv')
const cors = require('cors')
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const githubRoute = require('./routes/githubRoute')

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth/user', require('./routes/userRoute'))
app.use('/github', githubRoute)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})