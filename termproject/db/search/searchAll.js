const database = require('../index');

const SELECT_ALL_QUERY = `SELECT * FROM issues
  INNER JOIN categories
  ON issues.category_id = categories.category_id
  WHERE (title ILIKE $1) OR (description ILIKE $1) OR (city ILIKE $1) OR (zipcode ILIKE $1)`;

const searchAll = keyword => {
    console.log("search all");
  const VALUES = '%' + keyword + '%';
  return database
    .manyOrNone( SELECT_ALL_QUERY, VALUES )
    .catch( error => console.log( "Error in search: ", error) );
}

module.exports = searchAll;
