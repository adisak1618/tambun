var createError = require('http-errors');
var express = require('express');
const line = require('@line/bot-sdk');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const config = {
  channelAccessToken: 'yzrI9orBaIgmHhM4Av1FEVYPB2wcw6dBeo0ZdCy56Kmlidp6TPUdYLMOCScD+Gfs4Vu8+owfFOu4/mCXk+XRyYO84qvTx9wBgY5ZK9EoYxgY4DtjSSTODhgh+BnJO4egLzIONcvaiGcpgEP2q3iCvwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1942d541bf0167673e65e5a094a88f13'
};

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log('webhook', req.body);
  res.send('successeiei');
});
// app.use('/users', usersRouter);

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
