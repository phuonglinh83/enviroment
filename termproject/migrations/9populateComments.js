module.exports = {
  up: (queryInterface, Sequelize) => {
    const TIME = new Date();
    return queryInterface.bulkInsert( 'comments', [
      { issue_id: 1, user_id: 1, content: "Comment by user 1", createdAt: TIME},
      { issue_id: 1, user_id: 2, content: "Comment by user 2", createdAt: TIME},
      { issue_id: 2, user_id: 3, content: "Comment by user 3", createdAt: TIME},
      { issue_id: 2, user_id: 4, content: "Comment by user 4", createdAt: TIME},
      { issue_id: 3, user_id: 5, content: "Comment by user 5", createdAt: TIME},
      { issue_id: 3, user_id: 6, content: "Comment by user 6", createdAt: TIME},
      { issue_id: 4, user_id: 1, content: "Comment by user 1", createdAt: TIME},
      { issue_id: 4, user_id: 2, content: "Comment by user 2", createdAt: TIME},
      { issue_id: 5, user_id: 3, content: "Comment by user 3", createdAt: TIME},
      { issue_id: 5, user_id: 4, content: "Comment by user 4", createdAt: TIME},
      { issue_id: 6, user_id: 5, content: "Comment by user 5", createdAt: TIME},
      { issue_id: 6, user_id: 6, content: "Comment by user 6", createdAt: TIME},
      { issue_id: 7, user_id: 1, content: "Comment by user 1", createdAt: TIME},
      { issue_id: 7, user_id: 2, content: "Comment by user 2", createdAt: TIME},
      { issue_id: 8, user_id: 3, content: "Comment by user 3", createdAt: TIME},
      { issue_id: 8, user_id: 4, content: "Comment by user 4", createdAt: TIME},
      { issue_id: 9, user_id: 5, content: "Comment by user 5", createdAt: TIME},
      { issue_id: 9, user_id: 6, content: "Comment by user 6", createdAt: TIME},
      { issue_id: 10, user_id: 1, content: "Comment by user 1", createdAt: TIME},
      { issue_id: 10, user_id: 2, content: "Comment by user 2", createdAt: TIME},
      { issue_id: 11, user_id: 3, content: "Comment by user 3", createdAt: TIME},
      { issue_id: 11, user_id: 4, content: "Comment by user 4", createdAt: TIME},
      { issue_id: 12, user_id: 5, content: "Comment by user 5", createdAt: TIME},
      { issue_id: 12, user_id: 6, content: "Comment by user 6", createdAt: TIME},
      { issue_id: 13, user_id: 1, content: "Comment by user 1", createdAt: TIME},
      { issue_id: 13, user_id: 2, content: "Comment by user 2", createdAt: TIME},
      { issue_id: 14, user_id: 3, content: "Comment by user 3", createdAt: TIME},
      { issue_id: 14, user_id: 4, content: "Comment by user 4", createdAt: TIME},

    ], {});
  },
  down: ( queryInterface, Sequelize ) => {

  }
};
