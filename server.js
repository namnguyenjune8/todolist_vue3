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
app.use(function (req, res, next) {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
    //update the origin to match the domain of the Vue app
    req.headers.origin = "http://localhost:8080";
    //move on
    next();
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

//connect to db
database.connect();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});