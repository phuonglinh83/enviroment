const database = require('../index');

const FUZZY_SEARCH_QUERY = `SELECT * FROM issues
  INNER JOIN categories 
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id
  WHERE (city ILIKE $1) OR 
        (zipcode ILIKE $1)  OR
        (categories.type ILIKE $1) OR 
        (status.issue_status ILIKE $1)`;

const fuzzySearch = keyword => {
  const VALUES = '%' + keyword + '%';
  return database 
    .manyOrNone( FUZZY_SEARCH_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );  
}

module.exports = fuzzySearch; 