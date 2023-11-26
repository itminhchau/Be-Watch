"use strict";

require("core-js/modules/es.promise.js");
const {
  Sequelize
} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
// const sequelize = new Sequelize('shoedatabase', 'root', null, {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });
const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false
});
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
const {
  Op
} = require('sequelize');
sequelize.options.logging = (sql, timing) => {
  console.log(sql);
};
module.exports = connection;