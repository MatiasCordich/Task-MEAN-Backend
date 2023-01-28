require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./database/database')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/api', require('./routes/index'))


connectDB()

app.listen(PORT)
console.log(`Server rendering on http://localhost:${PORT}`)