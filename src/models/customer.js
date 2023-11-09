'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, { foreignKey: 'idCustomer', as: 'orders' });
      Customer.hasMany(models.Question, { foreignKey: 'idCustomer', as: 'questionCt' });
      Customer.hasMany(models.Answer, { foreignKey: 'idCustomer', as: 'answerCt' });

      Customer.belongsToMany(models.ImageProduct, {
        through: models.Cart,
        foreignKey: 'CustomerId',
        // as: 'imageProduct',
      });
      Customer.hasMany(models.Cart);
    }
  }
  Customer.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      shipAddress: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );
  return Customer;
};
