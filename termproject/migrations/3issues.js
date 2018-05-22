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
      status_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model:'status',
          key:'status_id'
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
      longtitude: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true
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
      month: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      day: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.TEXT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('issues');
  }
};
