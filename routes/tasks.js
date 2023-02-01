const express = require('express')
const { postTask, getTasks, getTask, updateTask, deleteTask } = require('../controllers/task.controller')

const router = express.Router()

router.post('/', postTask)
router.get('/all', getTasks)
router.get('/myTask', getTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router