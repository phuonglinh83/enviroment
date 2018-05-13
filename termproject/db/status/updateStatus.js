/*
  This file contains the CRUD function that will update the status of an issue.
  We use this function for the city manager's dashboard. They will be able 
  to change the status of an issue from "In Progress" to "Resolved" for example
  once the issue has been taken care of. 

  PARAMETERS:
  When you call this function we will be passing in an object that looks like this: 
  updateObject {
    issue_id: 2,
    status_id = 3
  };
  issue_id will tell us the exact issue in the table and the status_id will be the 
  numberical representation of what the city manager wants to change the status of the
  issue to. 
  1 = Pending
  2 = In Progress
  3 = Resolved 
  We use a nested query that first retrieves the proper row in the issues table as the inner query,
  then, the outer query will update that row's status to whatever the city manager changed the status to.
*/

const database = require('../index');

const UPDATE_STATUS_QUERY = `UPDATE issues 
  SET status_id = ($2)
  WHERE issue_id = ($1)`; 

const updateStatus = updateObject => {
  const VALUES = [
    updateObject.issue_id,
    updateObject.status_id
  ];

  return database 
    .none( UPDATE_STATUS_QUERY, VALUES)
    .catch( error => console.log("ERROR: ", error) );
};

module.exports = updateStatus; 