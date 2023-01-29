const {Router} = require('express')
const { getTasks } = require('../controllers/task.controller')
const { registerController, loginController } = require('../controllers/user.controller')
const { checkJWT } = require('../middlewares/session.middleware')
const router = Router()

router.get('/', (req, res) => {
  res.send("Server rendering")
})

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/tasks', checkJWT, getTasks)

router.get('/profile', checkJWT, (req, res) => {
  res.send(req.user)
})

module.exports = router