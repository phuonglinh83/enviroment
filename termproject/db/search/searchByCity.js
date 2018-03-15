const database = require('../index');

const SELECT_BY_CITY_QUERY = `SELECT * FROM issues
  INNER JOIN categories 
  ON issues.category_id = categories.category_id
  WHERE zipcode = $1`;

const searchByCity = keyword => {
  const VALUES = keyword;
  return database 
    .manyOrNone( SELECT_BY_CITY_QUERY, VALUES )
    .catch( error => console.log( "Error: ", error) );  
}

module.exports = searchByCity; 