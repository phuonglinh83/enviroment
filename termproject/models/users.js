'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};