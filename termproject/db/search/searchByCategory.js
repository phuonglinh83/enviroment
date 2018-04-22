/**
 * ============================ searchByCategory.js ===================================
 * This file is responsible for searching categories as the query.
 */

const database = require('../index');

const SELECT_BY_CATEGORY_QUERY = `SELECT * FROM issues
  INNER JOIN categories
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id
  WHERE (categories.type ILIKE $1)`;

const searchByCategory = keyword => {
  const VALUES = `%${keyword}%`;
  return database
    .manyOrNone( SELECT_BY_CATEGORY_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );
}

module.exports = searchByCategory;
