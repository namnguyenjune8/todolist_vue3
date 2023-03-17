const mongoose = require('mongoose');

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
