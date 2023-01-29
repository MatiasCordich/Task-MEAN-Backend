require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { connectDB } = require('./database/database')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser())


app.use('/api', require('./routes/index'))


connectDB()

app.listen(PORT)
console.log(`Server rendering on http://localhost:${PORT}`)