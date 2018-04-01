'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('status', {
      status_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      issue_status: {
        type: Sequelize.TEXT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('status');
  }
};