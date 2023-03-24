const express = require('express');

const path = require('path');

const database = require('./src/database');
const app = express();
const port = process.env.PORT || 3000;
const signInRouter = require(__dirname + '/src/router/signIn');
const signUpRouter = require(__dirname + '/src/router/userExisted');
const taskRouter = require(__dirname + '/src/router/task');

app.use(express.json());
app.use(signInRouter);
app.use(signUpRouter);
app.use('/',taskRouter);

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: 'include',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'dist')));

//connect to db
database.connect();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});