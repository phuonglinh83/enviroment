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