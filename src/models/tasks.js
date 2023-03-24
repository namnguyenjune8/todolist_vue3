  const mongoose = require('mongoose');
  const taskSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      completed: {
          type: Boolean,
          default: false,
      },
      createdAt: { 
        type: Date, 
        default: Date.now
       },
      createdBy: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User' }
    });
    module.exports = mongoose.model('Task', taskSchema);  
    