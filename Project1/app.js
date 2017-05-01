var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var noteapp = express();
var fs = require('fs'); // 파일 로드 사용

// view engine setup
noteapp.set('views', path.join(__dirname, 'views'));
noteapp.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//noteapp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
noteapp.use(logger('dev'));
noteapp.use(bodyParser.json());
noteapp.use(bodyParser.urlencoded({ extended: false }));
noteapp.use(cookieParser());
noteapp.use(express.static(path.join(__dirname, 'public')));

noteapp.use('/', index);
noteapp.use('/users', users);

// catch 404 and forward to error handler
noteapp.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
noteapp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.noteapp.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = noteapp;
