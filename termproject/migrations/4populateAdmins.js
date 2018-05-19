'use strict';
var bcrypt = require('bcrypt');
const saltRounds = 10;
var hashed;

// function getHash(string) {
//   // var hashed;
//   bcrypt.hash(string, saltRounds, function(err, hash) {
//     console.log(string+": "+hash);
//   });
// }

var admins = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'users', [
      { username: "anonymous", password: "", email: "", privilege: 1 },
      { username: "eva", password: "$2a$10$Hr9CyOGIyc9zqSYkKq/dTeQPrcPkKstX/hcyjE9/QuAC/d6.1F9zC", email: "eva@envirepair.com", privilege: 4 },
      { username: "lily", password: "$2a$10$HLfzQISKZcNWziy4GD9wU.L6SzJmZche1MQYMGqkdbGEWKIVWntne", email: "lily@envirepair.com", privilege: 4 },
      { username: "gary", password: "$2a$10$WS5VmisSIdgQnK8DK1U3xeZdTPYhUtrUoEraPj4Gm9o8NDduDoLy6", email: "gary@envirepair.com", privilege: 4 },
      { username: "uzair", password: "$2a$10$fw9gwgZZRZsnDP8gWrbMQ.X8Eotq.wOYW5tirwXuo.ylt1QrR6UWG", email: "uzair@envirepair.com", privilege: 4 },
      { username: "justin", password: "$2a$10$9sINOYWYy4Zk2Au.xMoTTesiI0RDwUPUfN3YU18LnkShODxiZwQ8K", email: "justin@envirepair.com", privilege: 4 },
      { username: "gerren", password: "$2a$10$2PVUBuq44ibrxqtPKdsFYOerxupmpXsi6ZLkBwd2bYX04AU0kd4Au", email: "gerren@envirepair.com", privilege: 4 },
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};

module.exports = admins;
