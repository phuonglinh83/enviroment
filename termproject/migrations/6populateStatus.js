module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'status', [
      { issue_status: "Pending" },
      { issue_status: "In Progress" },      
      { issue_status: "Resolved" },
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};