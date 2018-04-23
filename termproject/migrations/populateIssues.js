module.exports = {
  up: (queryInterface, Sequelize) => {
    const CURRENT_DATE = new Date();
    const MONTH = CURRENT_DATE.getMonth() + 1;
    const DAY = CURRENT_DATE.getDate();
    const YEAR = CURRENT_DATE.getFullYear();
    const TIME = CURRENT_DATE.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12:true});

    // const CREATED_AT = MONTH + "/" + DAY + "/" + YEAR;
    const UPDATED_AT = TIME;
    return queryInterface.bulkInsert( 'issues', [
      { category_id: 1, user_id: 6, status_id: 1, title: "Apollo Park", description: "fallen tree at park entrance", username: "gerren", streetAddress: "1234 west ave S", city: "lancaster", state: "california", zipcode: "93536", numberOfOccurrences: 1, imagePath: "/resources/issue_images/tree1.jpg", isFlagged: false, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 2, user_id: 1, status_id: 2, title: "AV College", description: "oil spill in parking lot", username: "eva", streetAddress: "3124 west ave k", city: "lancaster", state: "california", zipcode: "93536", numberOfOccurrences: 1, imagePath: "/resources/issue_images/field.jpg", isFlagged: false, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 3, user_id: 5, status_id: 3, title: "Market Street", description: "toxic waste in the street", username: "justin", streetAddress: "9875 market st", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/resources/issue_images/largetest.jpg", isFlagged: true, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 2, user_id: 4, status_id: 1, title: "Mission District", description: "Acid rain in Delores Park", username: "uzair", streetAddress: "9090 valencia street", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/resources/issue_images/tree.jpg", isFlagged: false, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 3, user_id: 3, status_id: 2, title: "West Lancaster", description: "nuclear waste is everywhere!", username: "gary", streetAddress: "4434 west ave A", city: "lancaster", state: "california", zipcode: "93536", numberOfOccurrences: 1, imagePath: "/resources/issue_images/field.jpg", isFlagged: true, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 1, user_id: 2, status_id: 3, title: "Sutter Street", description: "Acid rain is harming the trees, what a terrible time!", username: "lily", streetAddress: "0988 sutter st", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/resources/issue_images/mediumtest.jpg", isFlagged: false, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 1, user_id: 6, status_id: 1, title: "Montgomery Street", description: "fallen trees on montgomery", username: "gerren", streetAddress: "5612 montgomery st", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/resources/issue_images/treemedium.jpg", isFlagged: true, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 1, user_id: 6, status_id: 2, title: "Apollo Park", description: "fallen tree at park entrance", username: "gerren", streetAddress: "1234 west ave S", city: "lancaster", state: "california", zipcode: "93536", numberOfOccurrences: 1, imagePath: "/resources/issue_images/tree1.jpg", isFlagged: false, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 2, user_id: 1, status_id: 3, title: "AV College", description: "oil spill in parking lot", username: "eva", streetAddress: "3124 west ave k", city: "lancaster", state: "california", zipcode: "93536", numberOfOccurrences: 1, imagePath: "/resources/issue_images/field.jpg", isFlagged: false, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 3, user_id: 5, status_id: 1, title: "Market Street", description: "toxic waste in the street", username: "justin", streetAddress: "9875 market st", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/resources/issue_images/largetest.jpg", isFlagged: true, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 2, user_id: 4, status_id: 2, title: "Mission District", description: "Acid rain in Delores Park", username: "uzair", streetAddress: "9090 valencia street", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/resources/issue_images/tree.jpg", isFlagged: false, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 3, user_id: 3, status_id: 3, title: "West Lancaster", description: "nuclear waste is everywhere!", username: "gary", streetAddress: "4434 west ave A", city: "lancaster", state: "california", zipcode: "93536", numberOfOccurrences: 1, imagePath: "/resources/issue_images/field.jpg", isFlagged: true, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 1, user_id: 2, status_id: 1, title: "Sutter Street", description: "Acid rain is harming the trees, what a terrible time!", username: "lily", streetAddress: "0988 sutter st", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/resources/issue_images/mediumtest.jpg", isFlagged: false, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },
      { category_id: 1, user_id: 6, status_id: 2, title: "Montgomery Street", description: "fallen trees on montgomery", username: "gerren", streetAddress: "5612 montgomery st", city: "san francisco", state: "california", zipcode: "41310", numberOfOccurrences: 1, imagePath: "/resources/issue_images/treemedium.jpg", isFlagged: true, month: MONTH, day: DAY, year: YEAR, updatedAt: UPDATED_AT },


    ], {});
  },
  down: ( queryInterface, Sequelize ) => {

  }
};
