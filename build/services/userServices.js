"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserServices = exports.registerUserServices = exports.loginUserServices = exports.getSingleUserServices = exports.getAllUserServices = exports.deleteSingleUserServices = void 0;
require("core-js/modules/es.promise.js");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//genaral accesstoken
const generalAcessToken = data => {
  const access_token = jwt.sign(data, process.env.JWT_ACCESS_KEY, {
    expiresIn: '10h'
  });
  return access_token;
};
//genaral accesstoken
const generalRefreshToken = data => {
  const refresh_token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: '365d'
  });
  return refresh_token;
};
//hash password
const hashUserPassword = password => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
const registerUserServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      firstName,
      lastName,
      roleId,
      userName,
      password,
      phoneNumber,
      address,
      gender
    } = data;
    try {
      if (!firstName || !lastName || !roleId || !userName || !password || !phoneNumber || !address || !gender) {
        resolve({
          errCode: 1,
          message: "missing parameter "
        });
        return;
      }
      let userNameExists = await _models.default.User.findOne({
        where: {
          userName: userName
        }
      });
      if (userNameExists) {
        resolve({
          errCode: 1,
          message: 'Email already exists'
        });
        return;
      }
      let hashPasswordFormBcrypt = await hashUserPassword(password);
      await _models.default.User.create({
        firstName,
        lastName,
        roleId,
        userName,
        password: hashPasswordFormBcrypt,
        phoneNumber,
        address,
        gender
      });
      resolve({
        errCode: 0,
        errMessage: 'Register User success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.registerUserServices = registerUserServices;
const loginUserServices = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userName || !password) {
        resolve({
          errCode: 1,
          message: "missing parameter "
        });
        return;
      }
      const user = await _models.default.User.findOne({
        where: {
          userName: userName
        },
        raw: true
      });
      if (!user) {
        resolve({
          errCode: 1,
          message: 'Email is incorrect or does not exist'
        });
        return;
      }
      const checkPassword = await bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        resolve({
          errCode: 1,
          message: 'Password is incorrect '
        });
        return;
      }
      if (user && checkPassword) {
        const access_token = generalAcessToken({
          roleId: user.roleId,
          id: user.id
        });
        const refresh_token = generalRefreshToken({
          roleId: user.roleId,
          id: user.id
        });
        delete user.password;
        resolve({
          access_token,
          refresh_token,
          errCode: 0,
          message: 'login success'
        });
        return;
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.loginUserServices = loginUserServices;
const getAllUserServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await _models.default.User.findAll({
        attributes: {
          exclude: ['password']
        },
        raw: true,
        nest: true
      });
      if (!data) {
        resolve({
          errCode: 1,
          message: 'User not found'
        });
        return;
      }
      resolve({
        data,
        errCode: 0,
        message: 'get all user success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.getAllUserServices = getAllUserServices;
const getSingleUserServices = id => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const data = await _models.default.User.findOne({
        where: {
          id: id
        },
        attributes: {
          exclude: ['password']
        },
        raw: true,
        nest: true
      });
      if (!data) {
        resolve({
          errCode: 1,
          message: 'User not found'
        });
        return;
      }
      resolve({
        data,
        errCode: 0,
        message: 'get single user success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.getSingleUserServices = getSingleUserServices;
const deleteSingleUserServices = id => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const data = await _models.default.User.findOne({
        where: {
          id: id
        },
        raw: true,
        nest: true
      });
      if (data) {
        await _models.default.User.destroy({
          where: {
            id: id
          }
        });
        resolve({
          errCode: 0,
          errMessage: "The User is deleted successfully"
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "The User isn't exist"
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.deleteSingleUserServices = deleteSingleUserServices;
const updateUserServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      id,
      firstName,
      lastName,
      roleId,
      phoneNumber,
      address,
      gender
    } = data;
    try {
      if (!id || !firstName || !lastName || !roleId || !phoneNumber || !address || !gender) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
      }
      const data = await _models.default.User.findOne({
        where: {
          id: id
        },
        raw: true
      });
      if (data) {
        await _models.default.User.update({
          firstName: firstName,
          lastName: lastName,
          roleId: roleId,
          phoneNumber: phoneNumber,
          address: address,
          gender: gender
        }, {
          where: {
            id: id
          }
        });
        resolve({
          errCode: 0,
          message: 'update User success'
        });
      } else {
        resolve({
          errCode: 2,
          message: 'User not found'
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.updateUserServices = updateUserServices;