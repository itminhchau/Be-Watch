'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Brands', [
      {
        nameBrand: 'App Watch',
        origin: 'Canifonia of American',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameBrand: 'Xiaomi Watch',
        origin: 'China',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameBrand: 'SamSung Watch',
        origin: 'Korea',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Brands', null, {});
  },
};
