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
      category_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model:'categories',
          key:'category_id' 
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
      description: {
        type: Sequelize.STRING
      },
      resolved: {
        type: Sequelize.TEXT
      },
      username: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      streetAddress: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TEXT
      }, 
      zipcode: {
        type: Sequelize.TEXT
      },
      numberOfOccurrences: {
        type: Sequelize.INTEGER
      },
      imagePath: {
        type: Sequelize.TEXT
      },
      isFlagged: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      } 
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('issues');
  }
};