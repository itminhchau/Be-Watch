'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameProduct: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      shortDescription: {
        type: Sequelize.TEXT('long'),
      },
      description: {
        type: Sequelize.TEXT('long'),
      },
      quantitySold: {
        type: Sequelize.INTEGER,
      },
      totalStock: {
        type: Sequelize.INTEGER,
      },
      rate: {
        type: Sequelize.FLOAT,
      },
      idBrand: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};
