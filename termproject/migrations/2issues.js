'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('issues', {
      issue_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      resolved: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.TEXT
      },
      img: {
        type: Sequelize.TEXT
      },
      comment: {
        type: Sequelize.STRING
      }  
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('issues');
  }
};