  const mongoose = require('mongoose');
  const taskSchema = new mongoose.Schema({
      title: {
        type: String,
      },
      completed: {
          type: Boolean,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    });
    module.exports = mongoose.model('Task', taskSchema);