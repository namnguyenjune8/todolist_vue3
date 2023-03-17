const express = require('express');
const cors = require('cors');
const path = require('path');

const database = require('./src/database');
const app = express();
const port = process.env.PORT || 3000;
const signInRouter = require(__dirname + '/src/router/signIn');
const signUpRouter = require(__dirname + '/src/router/userExisted');

app.use(cors());
app.use(express.json());
app.use(signInRouter);
app.use(signUpRouter);

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

//connect to db
database.connect();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});