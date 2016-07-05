var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var home = require('./routes/index');
var api = require('./routes/api');
// packages I added
var cors = require('cors');
var errorhandler = require('errorhandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup cors
app.use(cors());

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/', api);

// catch 404 and raise error
app.use(function(req, res) {
  res.render('404', { title: 'Page not found' });
});

// error handlers
app.use(errorhandler());

module.exports = app;
