const database = require('../index');

const SELECT_BY_CITY_QUERY = `SELECT * FROM issues
  INNER JOIN categories 
  ON issues.category_id = categories.category_id
  WHERE (city LIKE $1) OR (zipcode LIKE $1)`;

const searchByCity = keyword => {
  const VALUES = '%' + keyword + '%';
  return database 
    .manyOrNone( SELECT_BY_CITY_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );  
}

module.exports = searchByCity; 