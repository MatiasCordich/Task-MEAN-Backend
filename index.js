require('dotenv').config()
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.json("Server rendering")
})

app.listen(PORT)
console.log(`Server rendering on http://localhost:${PORT}`)