/**
 * ============================ getComment.js ===================================
 * This file is responsible for getting a comment by its id from the database.
 *
 * CONTRIBUTORS: Lily Linh Lan
 */

const database = require('../index');

// Query to retrieve comment by a given comment id
const GET_COMMENT_QUERY = `SELECT * FROM comments
  INNER JOIN users
  ON comments.user_id = users.user_id
  WHERE (comment_id=$1)`;

const getComment = comment_id => {
  const VALUES = comment_id;

  // Querying the databse
  return database
    .one( GET_COMMENT_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );
}

module.exports = getComment;
