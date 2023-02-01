const Task = require("../models/Task")

const getTasks = async (req, res) => {

  try {

    const tasks = await Task.find({})

    return res.send(tasks)

  } catch (error) {
    res.status(500).send("ERROR_GETTING_TASKS")
  }

}

const getTask = async (req, res) => {
  try {

    const task = await Task.find({ user: req.user.id })

    if (!task) {
      res.status(200)
      res.send({ msg: "THERE_IS_NO_TASK" })
      return
    }

    return res.status(200).send(task)


  } catch (error) {
    res.status(500).send("ERROR_GETTING_TASK")
  }
}

const postTask = async (req, res) => {
  try {

    const { text } = req.body

    const newTask = new Task({
      text,
      user: req.user.id
    })

    await newTask.save()

    res.send(newTask)
  } catch (error) {
    res.status(500).send("ERROR_POSTING_TASK")
  }

}

const updateTask = async (req, res) => {
  try {

    const { id } = req.params

    const options = {new: true}

    const task = await Task.findById(id)

    if (!task) {
      return res.status(500).send({ msg: "THERE_IS_NO_TASK_TO_EDIT" })
    }

    if (task.user.toString() !== req.user.id) {
      res.status(500)
      res.send({ status: 401, msg: "THERE_IS_NO_YOUR_TASK" })
      return
    }

    const updateTask = await Task.findByIdAndUpdate(id, {
      text: req.body.text,
      completed: req.body.completed
    },options)

    return res.status(200).send(updateTask)

  } catch (error) {
    res.status(500).send("ERROR_UPDATING_TASK")
  }
}

const deleteTask = async (req, res) => {
  try {

    const { id } = req.params

    const task = await Task.findById(id)

    if (!task) {
      res.status(500)
      res.send({ msg: "THERE_IS_NO_TASK_TO_DELETE" })
      return
    }

    if (task.user === req.user.id) {
      res.status(500)
      res.send({ msg: "THERE_IS_NO_YOUR_TASK" })
      return
    }

    await Task.findByIdAndDelete(id)

    return res.status(200).send({ data: "TASK_DELETED_SUCCESSFULLY" })

  } catch (error) {
    res.status(500).send("ERROR_DELETING_TASK")
  }
}



module.exports = { getTasks, getTask, postTask, updateTask, deleteTask }