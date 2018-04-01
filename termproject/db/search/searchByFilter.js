const database = require('../index');

const DEFAULT_SEARCH_QUERY = `SELECT * FROM issues
  INNER JOIN categories 
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id
  WHERE (category.type ILIKE $1) OR (status.issue_status ILIKE $1)`;

const filterSearch = keyword => {
  const VALUES = '%' + keyword + '%';
  return database 
    .manyOrNone( DEFAULT_SEARCH_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );  
};

module.exports = filterSearch; 
