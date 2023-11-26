'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.hasMany(models.Answer, {
        foreignKey: 'idQuestion',
        as: 'anwerQs'
      });
      Question.belongsTo(models.Customer, {
        foreignKey: 'idCustomer',
        as: 'questionCt'
      });
      Question.belongsTo(models.Product, {
        foreignKey: 'idProduct',
        as: 'questionPr'
      });
    }
  }
  Question.init({
    idCustomer: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    content: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'Question'
  });
  return Question;
};