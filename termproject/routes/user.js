/**
 * ============================ user.js ===================================
 * This file handles all user related routes like registration, login, and profile.
 *
 * CONTRIBUTORS: Uzair Inamdar
 */

var express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const passport	= require("passport");
const addUser = require("../db/users/addUser");
var bcrypt = require('bcrypt');
const saltRounds = 10;

const issuesTable = require('../db/issues');


//Registration routes
router.get("/register", function(req, res) {
	res.render("register", {title: 'Register'});					//views/users/register.ejs
});

router.post("/register", function(req, res) {
	var emailEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var usernameEx = /^[a-zA-Z0-9]+([_\.]?[a-zA-Z0-9]){4,24}$/;

  // Backend form validation
	if(emailEx.test(req.body.email) && usernameEx.test(req.body.username)) {
    var hashedPass;
    console.log(req.body.password);

    // Encrpting password
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if(!err) {
        // Adding user to the database
        addUser({username: req.body.username, password: hash, email: req.body.email, privilege: 1});
      }
      else {
        console.log("bcrypt error:"+err);
      }
    });
    res.redirect("/user/login");
	} else {
		res.redirect("/");
	}
});


// Login/Logout routes
router.get("/login", function(req, res) {
	res.render("login", {title:"login"});					//views/users/login.ejs
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
		failureRedirect: "/user/login"
}), function(req, res) {});

router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

// User profile route
router.get("/profile", isLoggedIn, function(req, res) {
  //here you first want to query the issues the user has submitted, you can get their
  //user name by saying req.user.username 
  //call the read issues function
  //send that object that it returns to the users view
  console.log(req.user.username);
  const currentUser = req.user.username; 
  issuesTable
    .readUserIssues( currentUser )
    .then((result) => {
      console.log("Here is what the database returned", result);
      res.render("users", {title: "Profile", result: result});
    })
    .catch(error => {
      console.log(error);
    });
  
});

module.exports = router;
