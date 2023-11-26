'use strict';

/** @type {import('sequelize-cli').Migration} */
require("core-js/modules/es.promise.js");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProduct: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      star: {
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Reviews');
  }
};