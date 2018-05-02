'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
      comment_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      issue_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'issues',
          key:'issue_id'
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
      content: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comments');
  }
};
