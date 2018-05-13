/**
 * ============================ getRecent.js ===================================
 * This file is responsible for getting a list of recent issues.
 * 
 * CONTRIBUTORS: Uzair Inamdar
 */

const database = require('../index');

const GET_RECENT_QUERY = `SELECT * FROM issues
  INNER JOIN categories
  ON issues.category_id = categories.category_id
  INNER JOIN status
  ON issues.status_id = status.status_id
  ORDER BY day, month, year DESC`

const getRecent = () => {
    return database
      .any( GET_RECENT_QUERY)
      .catch( error => console.log( "Error in search: ", error.stack) );
  }


module.exports = getRecent;
