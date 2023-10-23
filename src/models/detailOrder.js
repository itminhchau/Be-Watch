'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Customer.hasMany(models.Order, { foreignKey: 'idCustomer', as: 'orders' });
      DetailOrder.belongsTo(models.Order);
      DetailOrder.belongsTo(models.ImageProduct);
    }
  }
  DetailOrder.init(
    {
      OrderId: DataTypes.INTEGER,
      ImageProductId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unitPrice: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'DetailOrder',
    }
  );
  return DetailOrder;
};
