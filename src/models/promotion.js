'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promotion.hasMany(models.Product, { foreignKey: 'idPromotion', as: 'promotion' });
    }
  }
  Promotion.init(
    {
      description: DataTypes.STRING,
      valuePromotion: DataTypes.INTEGER,
      expDate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Promotion',
    }
  );
  return Promotion;
};
