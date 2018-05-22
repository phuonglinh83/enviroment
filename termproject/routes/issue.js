/**
 * ============================ issue.js ===================================
 * This file handles all requests related to issues.
 *
 * CONTRIBUTORS: Uzair Inamdar, Gerren Penaloza, Justin Abarquez
 */
var express = require('express');
var path = require('path');

var router = express.Router();

let isLoggedIn = require('../middleware/isLoggedIn');
let issuesTable = require('../db/issues');
const getIssue = require('../db/issues/getIssue');
const getComments = require('../db/comments/getCommentsForIssue');
const getComment = require('../db/comments/getComment');
const addIssue = require('../db/issues/addIssue');
const addComment = require('../db/comments/addComment');

// File Upload module for submitting issues
const multer = require('multer');
// Setting Storage Engine
/*Here we are telling the app where to store the image once it 
  is uploaded 
  destination = the path to the uploads folder where the images 
  will be stored
  filename = the filename will be the name of the file with a timestamp
  concatinated onto the end of it to ensure it is unique
  cb = callback function 
  fieldname = the name attribute in form.ejs 
*/
const storage = multer.diskStorage({
  destination: './public/resources/issue_images',
  filename: function( req, file, cb) {
    //null is an error message that we don't need
    //basically all this is doing is taking the name of the file
    //the user submitted and appending a date to the end of it to
    //ensure that the file name is unique, then we can use the
    //filename in the database to record the path to the image on our
    //file system.
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Upload Variable
const upload = multer({
  storage: storage,
  //this is how we limit the filesize that the user can upload, it is in bytes
  limits: { fileSize: 1000000000 },
  // this is how we restrict the file type a user can upload, we only want
  // jpeg, jpg, png, or gif
  fileFilter: function( req, file, cb ){
    checkFileType( file, cb );
  }
}).single('image');

// This function will be used to check the extension of the file
// to ensure we only have photos getting uploaded
// we not only check the extension, but we check the mimetype as well
// because anyone can change the extension on the file, but the mimetype
// will tell us if the file is in png, jpg, etc. format
function checkFileType( file, cb ){
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext, this looks at the file extension and 
  //tries to match it to any of the valid filetypes we described above
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  //const check mimetype
  const mimetype = filetypes.test(file.mimetype);

  //check to see if the extension and the mimetype are valid
  if( mimetype && extname ) {
    //this means that the mimetype and extension were valid, so we let
    //the user submit the issue
    return cb( null, true );
  } else {
    //this means the user tried to submit something that wasn't an image
    cb('Error: Please upload images only!');
  }
}


// const getIssue = require('../db/issues/getIssue');

// Render the issue creation form.
router.get('/create', isLoggedIn, function(req, res) {
  res.render("form", { title: 'Create issue'});
});

// Adding the issue to the database.
router.post('/create', function(req, res) {
  upload( req, res, (err) => {
    if( err ) {
      //if the file was not uploaded correctly, render the form again
      // but with an error message displaying why the issue had not been
      // uploaded
      res.render("form", {
        title: 'Create Issue',
        msg: err
      });
    } else {
      //render the form page with a success message at the top letting the user know
      //that their issue was submitted successfully
      res.render("form", {
        title: 'Create Issue',
        msg: 'Successfully submitted issue!'
      });
    //in here write the code to insert the stuff from the form into the database 
      console.log("HERE IS REQUEST", req.body);
      const issueTitle = req.body.title;
      const description = req.body.description;
      const category = req.body.category;      
      const streetAddress = req.body.street;
      const city = req.body.city;
      const state = req.body.state;
      const zipcode = req.body.zipcode;
      const imagePath = `/resources/issue_images/${req.file.filename}`;
      
      console.log("THIS IS THE TITLE", issueTitle);      
      console.log("HERE IS THE DESCRIPTION:", description);
      console.log("THIS IS THE CATEGORY", category);
      console.log("THIS IS THE STREET ADDRESS", streetAddress);
      console.log("THIS IS THE CITY", city);
      console.log("THIS IS THE STATE", state);
      console.log("THIS IS THE ZIPCODE", zipcode);
      console.log("THIS IS THE FILE", req.file);

      console.log("THIS IS THE IMAGE PATH", imagePath);
      console.log("THIS IS THE USERNAME", req.user.username);
      console.log("THIS IS THE USER OBJECT", req.user); 

      console.log("THIS IS THE LATITUDE", req.body.lat);
      console.log("THIS IS THE LONGITUDE", req.body.lng);

      const issueObject = {
        category_id: 1,
        //should read the cookie to get this
        //req.user or req.username
        user_id: 6,
        status_id: 1,
        title: issueTitle,
        description: description,
        //should read the cookie, pass the userID in to get the username tied to the user_id and put that here for username
        username: 'gerren',
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipcode: zipcode,
        longtitude: null,
        latitude: null,
        numberOfOccurrences: 1,
        imagePath: imagePath,
        isFlagged: false
      }
      issuesTable
        .addIssue(issueObject)
        .catch( err => console.log( "Error: ", err ) );
    }; //end else
  });
});

// Adding a comment into the database
router.post('/postComment', function(req, res) {
  // console.log(req.body);
  // Only logged in user can comment
  const user_id = req.user.user_id;
  addComment({
    issue_id: req.body.issue_id,
    user_id: user_id,
    content: req.body.content
  }).then (result => {
    // console.log(result);
    // If successfully added, return the newly added comment
    getComment( result.comment_id ).then( comment => {
      res.status(200).json(comment);
    }).catch( error => console.log( "ERROR: ", error ) );
  })

});

// Rendering detailed view of the issue, including all comments.
router.get('/:id', function(req, res) {
  issuesTable.
  getIssue( req.params.id ).then( issue => {
    // console.log(issue);
    res.render("detailedview", { title: 'Detailed view', issue: issue});
  }).catch( error => console.log( "ERROR: ", error ) );
});

// Return longtitude and latitude for a given issue
router.get('/:id/location', function(req, res) {
  // Query database to get the issue information
  getIssue( req.params.id ).then( issue => {
    // Then return a JSON object for longtitude and latitude
    res.status(200).json({lat: issue.latitude, lng: issue.longtitude});
  }).catch( error => console.log( "ERROR: ", error ) );
});

// Return JSON objects for all comments on a given issue
router.get('/:id/comments', function(req, res) {
  getComments( req.params.id ).then( comments => {
    res.status(200).json(comments);
  }).catch( error => console.log( "ERROR: ", error ) );
});

module.exports = router;