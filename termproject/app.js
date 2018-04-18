if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
  // console.log(process_env.DATABASE_URL);
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

// const usersTable = require('./db/users');
// const locationsTable = require('./db/locations');
// const issuesTable = require('./db/issues');

// const userObject = {
//   username: "gerren",
//   password: "password",
//   email: "gpenalo1@mail.sfsu.edu",
//   privilege: 2
// };

// usersTable
//   .addUser(userObject)
//   .then(userResult => {
//     console.log(userResult.user_id);
//     console.log(userResult.username)
//   })
//   .catch( error => console.log( "ERROR: ", error) );


// const locationsObject = {
//   city: "san francisco",
//   state: "california",
//   zipcode: 94110,
//   numIssues: 1
// };

// usersTable  
//   .addUser( userObject )
  // .then( ( userResult ) => {
  //   locationsTable  
  //     .addLocation( locationsObject )
  //     .then( ( locationResult ) => {
  //       const issueObject = {
  //         location_id: locationResult.location_id,
  //         user_id: userResult.user_id,
  //         username: userResult.username,
  //         title: "cat land",
  //         resolved: "in progress",
  //         category: "chemical",
  //         img: "/images/tree.jpg",
  //         comment: "wow what a big white person!"
  //       };
  //       issuesTable
  //         .addIssue( issueObject )
  //         .then( result => {
  //           console.log( result );
  //         })
  //         //.catch( error => console.log(error));
  //     })
  //     //.catch( error => console.log(error));
  // })
  // .catch( error => console.log( "ERROR: ", error ) );

// const searchQueries = require('./db/search');

// searchQueries 
//   .searchByCity("san francisco")
//   .then((searchResult) => {
//     //searchResult.length returns 3 because there's 3 issues
//     //to access each element you can just say searchResult[0].location_id
//     console.log( searchResult.length );
//     console.log( searchResult[ 0 ].city );
//     console.log(searchResult);
//   })
//   .catch((error) => { console.log("error:", error)});

module.exports = app;
