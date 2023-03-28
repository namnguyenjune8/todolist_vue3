const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');
const  { authenticateToken } = require('../middleware/authenticateToken');

// Lấy tất cả các task
router.get('/task', authenticateToken, async (req, res) => {
    try {
      const tasks = await Task.find({ createdBy: req.query.createdBy })
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
router.delete('/task/:id', authenticateToken, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa tất cả các task
router.delete('/tasks', authenticateToken, async (req, res) => {
  try {
    const deletedTasks = await Task.deleteMany({ createdBy: req.query.createdBy });
    res.json(deletedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
