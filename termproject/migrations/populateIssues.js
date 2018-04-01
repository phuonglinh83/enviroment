module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'issues', [
      { category_id: 1, user_id: 6, title: "Apollo Park", description: "fallen tree at park entrance", resolved: "in progress", username: "gerren", streetAddress: "1234 west ave S", city: "lancaster", state: "california", zipcode: "93536", numberOfOccurrences: 1, imagePath: "/images/tree1.jpg", isFlagged: false, createdAt: new Date(), updatedAt: new Date() },
      { category_id: 1, user_id: 6, title: "AV College", description: "oil spill in parking lot", resolved: "in progress", username: "gerren", streetAddress: "3124 west ave k", city: "lancaster", state: "california", zipcode: "93536", numberOfOccurrences: 1, imagePath: "/images/tree.jpg", isFlagged: false, createdAt: new Date(), updatedAt: new Date() },
      { category_id: 1, user_id: 6, title: "Market Street", description: "toxic waste in the street", resolved: "in progress", username: "gerren", streetAddress: "9875 market st", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/images/tree1.jpg", isFlagged: false, createdAt: new Date(), updatedAt: new Date() },
      { category_id: 1, user_id: 6, title: "Mission District", description: "Acid rain in Delores Park", resolved: "in progress", username: "gerren", streetAddress: "9090 valencia street", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/images/tree.jpg", isFlagged: false, createdAt: new Date(), updatedAt: new Date() },
      
    ], {});
  },
  down: ( queryInterface, Sequelize ) => {

  }
};