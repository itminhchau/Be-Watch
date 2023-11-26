'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Answer.hasMany(models.Product, { foreignKey: 'idBrand', as: 'brand' });
      Answer.belongsTo(models.Customer, {
        foreignKey: 'idCustomer',
        as: 'answerCt'
      });
      Answer.belongsTo(models.Question, {
        foreignKey: 'idQuestion',
        as: 'anwerQs'
      });
    }
  }
  Answer.init({
    idCustomer: DataTypes.INTEGER,
    idQuestion: DataTypes.INTEGER,
    content: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'Answer'
  });
  return Answer;
};