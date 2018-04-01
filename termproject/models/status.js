'use strict';
module.exports = (sequelize, DataTypes) => {
  var status = sequelize.define('status', {
    issue_status: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return status;
};