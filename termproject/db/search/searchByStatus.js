/**
 * ============================ searchByStatus.js ===================================
 * This file is responsible for searching statuses as the query.
 * 
 * CONTRIBUTORS: Gerren Penaloza
 */

const database = require('../index');

const SELECT_BY_STATUS_QUERY = `SELECT * FROM issues
  INNER JOIN categories
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id
  WHERE (status.issue_status ILIKE $1)`;

const searchByStatus = keyword => {
  const VALUES = `%${keyword}%`;
  return database
    .manyOrNone( SELECT_BY_STATUS_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );
}

module.exports = searchByStatus;
