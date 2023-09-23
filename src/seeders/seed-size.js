'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sizes', [
      {
        shoeSize: '39,40,41,42,43',
        nameSize: 'male shoe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shoeSize: '35,36,37,38,39',
        nameSize: 'female shoe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Sizes', null, {});
  },
};
