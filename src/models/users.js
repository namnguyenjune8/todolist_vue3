const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    }
  });
  module.exports = mongoose.model('User', userSchema);