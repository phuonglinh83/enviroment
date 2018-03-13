const database = require('../index');

const INSERT_ISSUE_QUERY = `INSERT INTO issues
  ("location_id", "user_id", username, title, resolved, category, img, comment)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING "issue_id"`;

const addIssue = issueObject => {
  const VALUES = [ issueObject.location_id,
    issueObject.user_id,
    issueObject.username,
    issueObject.title,
    issueObject.resolved,
    issueObject.category,
    issueObject.img,
    issueObject.comment ];
  
  return database
    .one( INSERT_ISSUE_QUERY, VALUES )
    .catch( error => console.log( "ERROR: ", error ) );
};

module.exports = addIssue;