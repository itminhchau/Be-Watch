'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.belongsTo(models.Customer, { foreignKey: 'idCustomer', as: 'orders' });
      // Order.belongsToMany(models.Product, { through: models.DetailOrder });
    }
  }
  Cart.init(
    {
      idProduct: DataTypes.INTEGER,
      idCustomer: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );
  return Cart;
};
