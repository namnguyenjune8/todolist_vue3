const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/account_todolist',{
     useNewUrlParser: true, useUnifiedTopology: true
     })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));