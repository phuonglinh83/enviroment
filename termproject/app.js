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

const usersTable = require('./db/users');
const categoriesTable = require('./db/categories');
const issuesTable = require('./db/issues');
const searchQueries = require('./db/search');

const userObject = {
  username: "Khanh",
  password: "password",
  email: "exampleName@mail.sfsu.edu",
  privilege: 2
};

const categoryObject = {
  type: "pollution"
};

usersTable  
  .addUser( userObject )
  .then( ( userResult ) => {
    categoriesTable  
      .addCategory( categoryObject )
      .then( ( categoryResult ) => {
        const issueObject = {
          category_id: categoryResult.category_id,
          user_id: userResult.user_id,
          title: "Oil truck tipped over on market",
          description: "There's oil everywhere!",
          resolved: "resolved",
          username: userResult.username,
          streetAddress: "1234 market street",
          city: "san francisco",
          state: "california",
          zipcode: 91440,
          numberOfOccurrences: 1, 
          imagePath: "/images/tree.jpg",
          isFlagged: false
        };
        issuesTable
          .addIssue( issueObject )
          .then( issuesResult => {
            console.log( issuesResult );
          })
          //.catch( error => console.log(error));
      })
      //.catch( error => console.log(error));
  })
  .catch( error => console.log( "ERROR ADDING IN SHIT: ", error ) );



// searchQueries 
//   .searchByCity("san francisco")
//   .then((searchResult) => {
//     //searchResult.length returns 3 because there's 3 issues
//     //to access each element you can just say searchResult[0].location_id
//     console.log( searchResult.length );
//     console.log( searchResult[ 0 ].city );
//     console.log(searchResult);
//   })
//   .catch( error => console.log( "Error: ", error ) );

module.exports = app;