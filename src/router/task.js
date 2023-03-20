const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');

// Middleware lấy task theo id
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task' })
    }
    req.task = task
    next()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Lấy toàn bộ task
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    if(!tasks) throw Error ('Task not found');
    res.json(tasks);
  } catch (err) {
    res.status(404).json({ message: err.message });
  } 
});

// Lấy 1 task theo id
router.get('/:id', getTask, (req, res) => {
  res.json(req.task)
})


module.exports = router;