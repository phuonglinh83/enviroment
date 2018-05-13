/**
 * ============================ addCategory.js ===================================
 * This file is responsible for adding new categories to the databse.
 * 
 * CONTRIBUTORS: Gerren Penaloza
 */

const database = require('../index');

const INSERT_CATEGORY_QUERY = `INSERT INTO categories 
(type) 
VALUES ($1)
RETURNING category_id`

const addCategory = categoryObject => {
  const VALUES = [ categoryObject.type ];

  return database 
    .one( INSERT_CATEGORY_QUERY, VALUES )
    .catch( error => console.log( "ERROR: ", error ) );
};

module.exports = addCategory;