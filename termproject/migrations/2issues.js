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
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model:'locations',
          key:'location_id' 
        }
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model:'users',
          key:'user_id' 
        }
      },
      username: {
        allowNull: true,
        type: Sequelize.TEXT
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