/**
 * ============================ addStatus.js ===================================
 * This file is responsible for adding new issue status to the databse.
 * 
 * CONTRIBUTORS: Gerren Penaloza
 */

const database = require('../index');

const INSERT_STATUS_QUERY = `INSERT INTO status 
(type) 
VALUES ($1)
RETURNING status_id`

const addStatus = statusObject => {
  const VALUES = [ categoryObject.type ];

  return database 
    .one( INSERT_STATUS_QUERY, VALUES )
    .catch( error => console.log( "ERROR: ", error ) );
};

module.exports = addStatus;