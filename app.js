var createError = require('http-errors');
const mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

mongoose.connect('mongodb://amanphp:amanphp@cluster0-shard-00-00-r2i0z.mongodb.net:27017,cluster0-shard-00-01-r2i0z.mongodb.net:27017,cluster0-shard-00-02-r2i0z.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://localhost:27017/node_selenium',{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });


var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

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
  res.render('error');
});

module.exports = app;
