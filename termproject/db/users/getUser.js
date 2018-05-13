/**
 * ============================ getUser.js ===================================
 * This file gets the user and their details from the database when they login.
 * 
 * CONTRIBUTORS: Uzair Inamdar
 */

const database = require('../index');

const GET_USER_QUERY = `SELECT * FROM users
  WHERE username=$1`;

const getUser = (username, callback) => {
  const VALUE = username;
  database
    .one( GET_USER_QUERY, VALUE )
    .then(data => {return callback(data, null)})
    .catch( error => {return callback(null, error); console.log( "User not found: ", error)});
}

module.exports = getUser;
