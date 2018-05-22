/**
 * ============================ searchAll.js ===================================
 * This file is responsible for returning issue results from the database by using the search keyword.
 * 
 * CONTRIBUTORS: Gerren Penaloza, Uzair Inamdar
 */

const database = require('../index');

// Creating the search query.
const SEARCH_ALL_QUERY = `SELECT * FROM issues
  INNER JOIN categories
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id
  WHERE (title ILIKE $1) OR (description ILIKE $1) OR (city ILIKE $1) OR (zipcode ILIKE $1)`;

const searchAll = keyword => {
    console.log("search all");
  const VALUES = `%${keyword}%`;
  console.log(VALUES);
  console.log("Here it is: "+keyword);
    return database
      .any( SEARCH_ALL_QUERY, VALUES )
      .catch( error => console.log( "Error in search: ", error.stack) );
  }


module.exports = searchAll;