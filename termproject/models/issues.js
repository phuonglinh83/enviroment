'use strict';
module.exports = (sequelize, DataTypes) => {
  var issues = sequelize.define('issues', {
    location: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    resolved: DataTypes.TEXT,
    category: DataTypes.TEXT,
    img: DataTypes.TEXT,
    comment: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function( models ) {
        // associations can be defined here
        issues.belongsTo( models.categories );
        issues.belongsTo( models.users );
        issues.belongsTo( models.status);
      }
    }
  });
  return issues;
};