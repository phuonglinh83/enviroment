if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');

let search = require('./routes/search');
let searchDefault = require('./routes/searchDefault');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/about', about);

//DELETE THIS AFTER PROTOTYPE TESTING IS DONE
app.use('/search', search);
app.use('/searchDefault', searchDefault);

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
  // res.locals.myname = 5;
  // console.log(res.locals);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const searchTable = require('./db/search');
// let keyword = 'resolved';
// searchTable
//   .fuzzySearch(keyword)
//   .then((result) => {
//     console.log(result, result.length);
//   })
//   .catch((error) => { console.log("error in filter search:", error )});

// searchTable
//   .defaultSearch()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => { console.log("error:", error)});

const ISSUES_TABLE = require('./db/issues');
ISSUES_TABLE  
  .readIssue(1)
  .then((issueResult) => {
    console.log(issueResult);
  })
  .catch((error) => console.log("fucked up returning the read search result", error));

module.exports = app;