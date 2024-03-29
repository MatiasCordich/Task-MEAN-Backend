const express = require('express')
const { registerController, loginController } = require('../controllers/user.controller')

const router = express.Router()

router.post('/login', loginController)
router.post('/register', registerController)

module.exports = router