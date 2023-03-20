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

// Tạo 1 task
// router.post('/', async (req, res) => {
//   const task = new Task({
//     title: req.body.task,
//     completed: req.body.completed
//   });
//   try {
//     const newTask = await task.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Sửa 1 task
// router.patch('/:id', getTask, async (req, res) => {
//   if (req.body.title != null) {
//     res.task.title = req.body.title;
//   }
//   if (req.body.completed != null) {
//     res.task.completed = req.body.completed;
//   }

//   try {
//     const updatedTask = await res.task.save();
//     res.json(updatedTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

//   // Xóa 1 task
// router.delete('/:id', getTask, async (req, res) => {
//     try {
//       await res.task.remove();
//       res.json({ message: 'Deleted Task' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

module.exports = router;