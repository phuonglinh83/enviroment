const database = require('../index');

const INSERT_ISSUE_QUERY = `INSERT INTO issues
  (category_id, user_id, status_id, title, description,
  username, "streetAddress", city, state, zipcode, "numberOfOccurrences",
  "imagePath", "isFlagged", "createdAt", "updatedAt")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
  $11, $12, $13, $14, $15)
  RETURNING "issue_id"`;

const addIssue = issueObject => {
  // let currentDate = new Date();
  const CURRENT_DATE = new Date();
  const MONTH = CURRENT_DATE.getMonth() + 1;
  const DAY = CURRENT_DATE.getDate();
  const YEAR = CURRENT_DATE.getFullYear();
  const TIME = currentDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12:true});

  const CREATED_AT = MONTH + "/" + DAY + "/" + YEAR;
  const UPDATED_AT = TIME;

  issueObject[ "createdAt" ] = CREATED_AT;
  issueObject[ "updatedAt" ] = UPDATED_AT;

  const VALUES = [ issueObject.category_id,
    issueObject.user_id,
    issueObject.status_id,
    issueObject.title,
    issueObject.description,
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
