'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var models = require(__dirname + '/models');
var Director = models.Director;
var Movie = models.Movie;
var User = models.User;

var adminRouter = express.Router();
var loginRouter = express.Router();
var directorRouter = express.Router();
var movieRouter = express.Router();

app.use(bodyParser.json());


require(__dirname + '/routes/admin_routes')(adminRouter, models);
require(__dirname + '/routes/login_routes')(loginRouter, models);
require(__dirname + '/routes/director_routes')(directorRouter, models);
require(__dirname + '/routes/movie_routes')(movieRouter, models);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

app.use('/admin', adminRouter);
app.use('/login', loginRouter);
app.use('/directors', directorRouter);
app.use('/movies', movieRouter);

app.listen(3000, () => {
  console.log('server started');
});
