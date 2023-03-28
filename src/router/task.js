const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');
const  { authenticateToken } = require('../middleware/authenticateToken');

// Lấy tất cả các task
router.get('/task', authenticateToken, async (req, res) => {
    try {
    const tasks = await Task.find().populate('createdBy', 'user');
    res.json(tasks);
    } catch (error) { 
    res.status(500).json({ message: error.message });
    }
    });

// Thêm mới task
router.post('/addTask', authenticateToken, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    createdBy: req.body.createdBy,
  });
  try {
    const newTask = await task.save();
    console.log(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    if (deletedTask) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
