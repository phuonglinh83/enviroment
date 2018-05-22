const database = require('../index');

const READ_ISSUE_QUERY = `SELECT * FROM issues 
WHERE issue_id = $1`;

const READ_ISSUE = issue_id => {
  return database
    .one(READ_ISSUE_QUERY, issue_id)
    .catch( error => console.log("Error reading issue: ", error ) );
};

module.exports = READ_ISSUE;