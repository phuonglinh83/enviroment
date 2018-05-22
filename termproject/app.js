/**
 * ============================ app.js ===================================
 * This file is the core of the web server.
 * Brings together all the different neccessary modules together.
 * All incoming and outgoing requests are routed through this failed
 *
 */

// Development environment
if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
  // console.log(process_env.DATABASE_URL);
}


// Core modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var processImage = require('express-processimage');
var gm = require('gm');
var bb = require('express-busboy');

// User-Auth modules
const passport = require("passport");
const	local = require("passport-local");
const	expSession = require("express-session");
var bcrypt = require('bcrypt');



// Routes
const index = require('./routes/index');
const user = require('./routes/user');
const about = require('./routes/about');
const search = require('./routes/search');
const issue = require('./routes/issue');
const getUser = require('./db/users/getUser');

// Express middleware instantiation
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

// Middleware setup for parsing HTTP body contents to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use busboy-expression for parsing both JSON text and files
// bb.extend(app, { upload: true });

// Middleware setup for parsing storing cookies
app.use(cookieParser());

app.use(processImage(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(processImage(path.join(__dirname, 'public')));


// Login session setup
app.use(expSession({
  secret: 'bazinga',
  resave: false,
  saveUninitialized: false
}));

// Passport User-Auth setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new local({
  passReqToCallback: true
}, (req, username, password, done) => {
  getUser(username, (user,err)=> {
    // if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // Comparing encrypted passwords
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

// Making user object available to all views once logedin
app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

// Routes Handling
app.use('/', index);
app.use('/user', user);
app.use('/about', about);
app.use('/search', search);
app.use('/issue', issue);
// app.use('/searchDefault', searchDefault);

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

const issuesTable = require('./db/issues');

issuesTable
  .readUserIssues('gerren')
  .then((result) => {
    console.log(result);
  })
  .catch((error) =>{
    console.log(error);
  })

module.exports = app;