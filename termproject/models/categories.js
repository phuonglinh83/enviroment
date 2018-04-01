'use strict';
module.exports = (sequelize, DataTypes) => {
  var locations = sequelize.define('categories', {
    type: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function( models ) {
        // associations can be defined here
      }
    }
  });
  return locations;
};