'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'agus',
      password: 'agus',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'user1',
      password: 'user1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'person1',
      password: 'person1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
