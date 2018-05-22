/**
 * ============================ getIssue.js ===================================
 * This file is responsible for adding new issues to the databse.
 *
 * CONTRIBUTORS: Gerren Penaloza
 */

const database = require('../index');

// Creating query.
const GET_ISSUE_QUERY = `SELECT * FROM issues
  INNER JOIN categories
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id
  WHERE (issue_id=$1)`;

const getIssue = keyword => {
  const VALUES = keyword;
  console.log(VALUES);

  // Querying the databse
  return database
    .one( GET_ISSUE_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );
}

module.exports = getIssue;
