'use strict';
module.exports = (sequelize, DataTypes) => {
  var locations = sequelize.define('locations', {
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    zipcode: DataTypes.INTEGER,
    numIssues: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function( models ) {
        // associations can be defined here
      }
    }
  });
  return locations;
};