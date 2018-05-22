/**
 * ============================ getComments.js ===================================
 * This file is responsible for getting comments on an issue from the database.
 *
 * CONTRIBUTORS: Lily Linh Lan
 */

const database = require('../index');

// Query to retrieve comments for a given issue id,
// Results are ordered by comment created time
const GET_COMMENTS_QUERY = `SELECT * FROM comments
  INNER JOIN users
  ON comments.user_id = users.user_id
  WHERE (issue_id=$1)
  ORDER BY "createdAt"`;

const getComments = issue_id => {
  const VALUES = issue_id;

  // Querying the databse
  return database
    .any( GET_COMMENTS_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );
}

module.exports = getComments;
