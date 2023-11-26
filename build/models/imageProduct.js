'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ImageProduct.belongsTo(models.Product, {
        foreignKey: 'idProduct',
        as: 'imageProduct'
      });
      ImageProduct.belongsTo(models.Color, {
        foreignKey: 'idColor',
        as: 'colorProduct'
      });
      ImageProduct.belongsToMany(models.Customer, {
        through: models.Cart,
        foreignKey: 'ImageProductId'
        // as: 'customer',
      });

      ImageProduct.hasMany(models.Cart);
      ImageProduct.belongsToMany(models.Order, {
        through: models.DetailOrder,
        foreignKey: 'ImageProductId'
      });
      ImageProduct.hasMany(models.DetailOrder);
    }
  }
  ImageProduct.init({
    idProduct: DataTypes.INTEGER,
    idColor: DataTypes.INTEGER,
    url: DataTypes.STRING,
    stock: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ImageProduct'
  });
  return ImageProduct;
};