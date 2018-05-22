/**
 * ============================ addComment.js ===================================
 * As the name suggests this file is responsible for adding new comment to the databse.
 *
 * CONTRIBUTORS: Lily Linh Lan
 */

const database = require('../index');

const INSERT_COMMENT_QUERY = `INSERT INTO comments
  (issue_id, user_id, content, "createdAt")
  VALUES ($1, $2, $3, $4)
  RETURNING "comment_id"`;

const addComment = commentObject => {
  // Adding current time as created time for the comment object
  commentObject[ "createdAt" ] = new Date();

  const VALUES = [
    commentObject.issue_id,
    commentObject.user_id,
    commentObject.content,
    commentObject.createdAt ];

  // Inserting data into the database.
  return database
    .one( INSERT_COMMENT_QUERY, VALUES )
    .catch( error => console.log( "ERROR IN ADD ISSUE: ", error ) );
};

module.exports = addComment;
