if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const passport = require("passport");
const	local = require("passport-local");
const	expSession = require("express-session");
var bcrypt = require('bcrypt');

const index = require('./routes/index');
const user = require('./routes/user');
const about = require('./routes/about');
const search = require('./routes/search');
const getUser = require('./db/users/getUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function(err, req, res, next) {
    console.log(err);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expSession({
  secret: 'bazinga',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new local({
  passReqToCallback: true
}, (req, username, password, done) => {
  getUser(username, (user,err)=> {
    // if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return bcrypt.compare(req.body.password, user.password, function(err, res) {
      if (!res) { console.log("Auth failed"); return done(null, false); }
      return done(null, user);
    });
  });
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

app.use('/', index);
app.use('/user', user);
app.use('/about', about);
app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
