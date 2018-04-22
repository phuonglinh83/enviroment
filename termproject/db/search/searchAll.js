/**
 * ============================ searchAll.js ===================================
 * This file is responsible for returning issue results from the database by using the search keyword.
 */

const database = require('../index');

// Creating the search query.
const SELECT_ALL_QUERY = `SELECT * FROM issues
  INNER JOIN categories
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id
  WHERE (title ILIKE $1) OR (description ILIKE $1) OR (city ILIKE $1) OR (zipcode ILIKE $1)`;

const searchAll = keyword => {
    console.log("search all");
  const VALUES = `%${keyword}%`;
  console.log(VALUES);

  // Querying the databse
  return database
    .manyOrNone( SELECT_ALL_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );
}

module.exports = searchAll;
