'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand, { foreignKey: 'idBrand', as: 'brand' });
      Product.hasMany(models.Review, { foreignKey: 'idProduct', as: 'review' });
      Product.belongsToMany(models.Order, { through: models.DetailOrder });
      Product.belongsToMany(models.Customer, { through: models.Cart });
      Product.hasMany(models.ImageProduct, { foreignKey: 'idProduct', as: 'imageProduct' });
    }
  }
  Product.init(
    {
      nameProduct: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT('long'),
      rate: DataTypes.FLOAT,
      count: DataTypes.INTEGER,
      idBrand: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
