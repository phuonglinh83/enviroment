const database = require('../index');

const INSERT_USER_QUERY = `INSERT INTO users
  (username,password,email,privilege)
  VALUES($1,$2,$3,$4)
  RETURNING "user_id", "username"`;

const addUser = userObject => {
  const VALUES = [ userObject.username,
    userObject.password,
    userObject.email,
    userObject.privilege ];
  
  return database 
    .one( INSERT_USER_QUERY, VALUES )
    .catch( error => console.log( "ERROR: ", error ) ); 
};

module.exports = addUser;