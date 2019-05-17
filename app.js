var express			= require('express'),
	path			= require('path'),
	cookieParser	= require('cookie-parser'),
	logger			= require('morgan');

var indexRouter	= require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
