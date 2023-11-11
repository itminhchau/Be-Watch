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
      Product.belongsTo(models.Promotion, { foreignKey: 'idPromotion', as: 'promotion' });
      Product.hasMany(models.Review, { foreignKey: 'idProduct', as: 'review' });
      Product.hasMany(models.Question, { foreignKey: 'idProduct', as: 'questionPr' });

      // Product.belongsToMany(models.Customer, { through: models.Cart });
      Product.hasMany(models.ImageProduct, {
        foreignKey: 'idProduct',
        as: 'imageProduct',
        onDelete: 'CASCADE',
        hooks: true,
      });
    }
  }
  Product.init(
    {
      nameProduct: DataTypes.STRING,
      price: DataTypes.FLOAT,
      shortDescription: DataTypes.TEXT('long'),
      description: DataTypes.TEXT('long'),
      quantitySold: DataTypes.INTEGER,
      rate: DataTypes.FLOAT,
      idPromotion: DataTypes.INTEGER,
      idBrand: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
