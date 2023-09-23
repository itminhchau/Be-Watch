'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Size.init(
    {
      shoeSize: DataTypes.STRING,
      nameSize: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Size',
    }
  );
  return Size;
};
