const database = require('../index');

const DEFAULT_SEARCH_QUERY = `SELECT * FROM issues
  INNER JOIN categories 
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id`;

const defaultSearch = () => {
  return database 
    .manyOrNone( DEFAULT_SEARCH_QUERY )
    .catch( error => console.log( "Error in default search: ", error) );  
}

module.exports = defaultSearch; 