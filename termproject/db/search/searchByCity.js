const database = require('../index');

const SELECT_BY_CITY_QUERY = `SELECT * FROM locations
  INNER JOIN issues 
  ON locations.location_id = issues.location_id
  WHERE city = ($1)`;

const searchByCity = keyword => {
  const VALUES = keyword;
  return database 
    .manyOrNone( SELECT_BY_CITY_QUERY, VALUES )
    .catch( error => console.log( "Error: ", error) );  
}

module.exports = searchByCity; 