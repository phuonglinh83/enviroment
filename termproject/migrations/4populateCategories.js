module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'categories', [
      { type: "pollution" },
      { type: "waste" },
      { type: "toxicants" },
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};