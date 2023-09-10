'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categorize.hasMany(models.Product, { foreignKey: 'idCategorize', as: 'categorize' });
    }
  }
  Categorize.init(
    {
      nameCategorize: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Categorize',
    }
  );
  return Categorize;
};
