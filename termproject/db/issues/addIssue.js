const database = require('../index');

const INSERT_ISSUE_QUERY = `INSERT INTO issues
  ("category_id", "user_id", title, description, resolved, 
  username, "streetAddress", city, state, zipcode, "numberOfOccurrences",
  "imagePath", "isFlagged", "createdAt", "updatedAt")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
  $11, $12, $13, $14, $15)
  RETURNING "issue_id"`;

const addIssue = issueObject => {
  let currentDate = new Date();
  
  issueObject[ "createdAt" ] = currentDate;
  issueObject[ "updatedAt" ] = currentDate;

  const VALUES = [ issueObject.category_id,
    issueObject.user_id,
    issueObject.title,
    issueObject.description,
    issueObject.resolved,
    issueObject.username,
    issueObject.streetAddress,
    issueObject.city,
    issueObject.state,
    issueObject.zipcode,
    issueObject.numberOfOccurrences,
    issueObject.imagePath,
    issueObject.isFlagged,
    issueObject.createdAt,
    issueObject.updatedAt ];
  
  return database
    .one( INSERT_ISSUE_QUERY, VALUES )
    .catch( error => console.log( "ERROR IN ADD ISSUE: ", error ) );
};

module.exports = addIssue;