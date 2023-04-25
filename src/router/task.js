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
    tag: req.body.tag,
    subtag: req.body.subtag,
    createdBy: req.body.createdBy,
    dateActive: req.body.dateActive,
  });
  try {
    const newTask = await task.save();
    console.log(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Xóa task
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
    const deletedTasks = await Task.deleteMany({ createdBy:  req.user.id });
    res.json(deletedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//task completed
router.put('/task/:id', authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.completed = !task.completed;
    await task.save();
    res.send(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// Xử lý check completed toàn bộ task
router.put('/tasks/completed', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.updateMany({ createdBy: req.user.id, completed: false }, { completed: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật task
router.put('/task/:id', authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.send(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
