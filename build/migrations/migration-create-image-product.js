'use strict';

/** @type {import('sequelize-cli').Migration} */
require("core-js/modules/es.promise.js");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ImageProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProduct: {
        type: Sequelize.INTEGER
      },
      idColor: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ImageProducts');
  }
};