/* Installed 3rd party packages */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//config mongoDB

let mongoose = require('mongoose');
let DB = require("./db");

// point mongoose to DB URI 
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;    // create a connection
mongoDB.on('error', console.error.bind(console, 'Connection Error'));   // check connection of mongoDB, if there is an error --> display eror,
mongoDB.once('open', ()=> {
    console.log('connected to MongoDB');
});


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let workoutRouter = require('../routes/workouts');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);          // localhost:3000
app.use('/users', usersRouter);     // localhost:3000/users
app.use('/workouts', workoutRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    title:"Error"
  });
});

module.exports = app;
