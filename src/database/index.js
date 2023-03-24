const mongoose = require('mongoose');
const Task = require('../models/tasks');
const User = require('../models/users');

async function connect() {
    try {
        mongoose.set('strictQuery',false);
        await mongoose.connect('mongodb://127.0.0.1:27017/account_todolist',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
        });
        console.log('MongoDB Connected');
        
    } catch (error) {
        console.log('error');
    }
}

module.exports = {connect};
