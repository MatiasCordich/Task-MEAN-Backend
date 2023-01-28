const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.send("Server rendering")
})

router.post('/register', (req, res) => {
  res.send('Register user')
})

router.post('/login', (req, res) => {
  res.send('Login user')
})

module.exports = router