'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, { foreignKey: 'idCustomer', as: 'orders' });
      Order.belongsToMany(models.ImageProduct, { through: models.DetailOrder, foreignKey: 'OrderId' });
      Order.hasMany(models.DetailOrder);
    }
  }
  Order.init(
    {
      // date: DataTypes.DATE,
      totalPrice: DataTypes.FLOAT,
      status: DataTypes.STRING,
      idCustomer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
