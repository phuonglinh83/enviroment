const database = require('../index');

const INSERT_LOCATIONS_QUERY = `INSERT INTO locations
  (city, state, zipcode, "numIssues")
  VALUES ($1, $2, $3, $4)
  RETURNING "location_id"`;

const addLocation = locationObject => {
  const VALUES = [
    locationObject.city, 
    locationObject.state,
    locationObject.zipcode,
    locationObject.numIssues
  ];

  return database 
    .one( INSERT_LOCATIONS_QUERY, VALUES )
    .catch( error => console.log( "ERROR: ", error ) );
};

module.exports = addLocation; 