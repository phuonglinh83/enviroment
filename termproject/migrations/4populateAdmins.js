module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'users', [
      { username: "eva", password: "eva", email: "eva@envirepair.com", privilege: 4 },
      { username: "lily", password: "lily", email: "lily@envirepair.com", privilege: 4 },
      { username: "gary", password: "gary", email: "gary@envirepair.com", privilege: 4 },
      { username: "uzair", password: "uzair", email: "uzair@envirepair.com", privilege: 4 },
      { username: "justin", password: "justin", email: "justin@envirepair.com", privilege: 4 },
      { username: "gerren", password: "gerren", email: "gerren@envirepair.com", privilege: 4 },
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};