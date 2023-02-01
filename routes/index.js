const {Router} = require('express')
const { getTasks, postTask, getTask, updateTask, deleteTask } = require('../controllers/task.controller')
const authRoutes = require('./auth')
const taskRoutes = require('./tasks')
const { checkJWT } = require('../middlewares/session.middleware')
const router = Router()

router.get('/', (req, res) => {
  res.send("Server rendering")
})

router.use('/auth', authRoutes)
router.use('/tasks', checkJWT, taskRoutes)

module.exports = router