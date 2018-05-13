/**
 * ============================ searchByCity.js ===================================
 * This file is responsible for searching results with the name of the city as the query.
 * Makes use of % Like feature to find any matching string in any column of the issue table.
 * 
 * CONTRIBUTORS: Gerren Penaloza
 */

const database = require('../index');

const SELECT_BY_CITY_QUERY = `SELECT * FROM issues
  INNER JOIN categories
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id
  WHERE (city ILIKE $1) OR (zipcode ILIKE $1)`;

const searchByCity = keyword => {
  const VALUES = `%${keyword}%`;
  return database
    .any( SELECT_BY_CITY_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );
}

module.exports = searchByCity;
