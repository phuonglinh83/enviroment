/*
  Takes in the user_id that can be taken from the url,
  the function will return all of the users a single user has reported.
  The purpose of this function is to display all of the issues the user 
  has reported onto their dashboard. 
*/
const database = require('../index');

const READ_USER_ISSUES_QUERY = `SELECT * FROM issues 
WHERE user_id = $1`;

const READ_USER_ISSUES = user_id => {
  return database
    .manyOrNone(READ_USER_ISSUES_QUERY, user_id)
    .catch( error => console.log("Error reading user issues: ", error ) );
};

module.exports = READ_USER_ISSUES;