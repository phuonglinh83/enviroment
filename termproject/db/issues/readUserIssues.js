/*
  Takes in the user_id that can be taken from the url,
  the function will return all of the users a single user has reported.
  The purpose of this function is to display all of the issues the user 
  has reported onto their dashboard. 
*/
const database = require('../index');

const READ_USER_ISSUES_QUERY = `SELECT title, description, "streetAddress", type, issue_status 
FROM issues 
INNER JOIN status
ON issues.status_id = status.status_id
INNER JOIN categories
ON categories.category_id = issues.category_id
WHERE username = $1`;

const READ_USER_ISSUES = username => {
  return database
    .manyOrNone(READ_USER_ISSUES_QUERY, username)
    .catch( error => console.log("Error reading user issues: ", error ) );
};

module.exports = READ_USER_ISSUES;