const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');

// Middleware function to get task by id
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

// Get all tasks
router.get('/task/:id', async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id);
    if(!tasks) throw Error ('Task not found');
    res.json(tasks);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Get a task by id
router.get('/:id', getTask, (req, res) => {
  res.json(req.task)
})

// Create a task
router.post('/', async (req, res) => {
  const task = new Task({
    task: req.body.task
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Update a task
// router.patch('/:id', getTask, async (req, res) => {
//     if (req.body.task != null) {
//       res.task.task = req.body.task;
//     }
  
//     try {
//       const updatedTask = await res.task.save();
//       res.json(updatedTask);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

//   // Delete a task
// router.delete('/:id', getTask, async (req, res) => {
//     try {
//       await res.task.remove();
//       res.json({ message: 'Deleted Task' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

module.exports = router;