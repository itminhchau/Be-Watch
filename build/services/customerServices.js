"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCustomerService = exports.registerCustomerServices = exports.refreshTokenCustomerService = exports.loginCustomerServices = exports.getSingleCustomerServices = exports.getAllCustomerServices = void 0;
require("core-js/modules/es.promise.js");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//genaral accesstoken
const generalAcessToken = data => {
  const access_token = jwt.sign(data, process.env.JWT_ACCESS_KEY, {
    expiresIn: '8h'
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
const registerCustomerServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      firstName,
      lastName,
      userName,
      password,
      shipAddress,
      phoneNumber,
      gender,
      role
    } = data;
    try {
      if (!firstName || !lastName || !userName || !password || !shipAddress || !phoneNumber || !gender || !role) {
        resolve({
          errCode: 1,
          message: "missing parameter "
        });
        return;
      }
      let userNameExists = await _models.default.Customer.findOne({
        where: {
          userName: userName
        }
      });
      if (userNameExists) {
        resolve({
          errCode: 1,
          message: 'Email đã tồn tại'
        });
        return;
      }
      let hashPasswordFormBcrypt = await hashUserPassword(password);
      await _models.default.Customer.create({
        firstName,
        lastName,
        userName,
        password: hashPasswordFormBcrypt,
        role,
        shipAddress,
        phoneNumber,
        gender
      });
      resolve({
        errCode: 0,
        errMessage: 'Register Customer success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.registerCustomerServices = registerCustomerServices;
const loginCustomerServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      userName,
      password
    } = data;
    try {
      if (!userName || !password) {
        resolve({
          errCode: 1,
          message: "missing parameter "
        });
        return;
      }
      const customer = await _models.default.Customer.findOne({
        where: {
          userName: userName
        },
        raw: true
      });
      if (!customer) {
        resolve({
          errCode: 1,
          message: 'Email không chính xác hoặc không tồn tại'
        });
        return;
      }
      const checkPassword = await bcrypt.compareSync(password, customer.password);
      if (!checkPassword) {
        resolve({
          errCode: 1,
          message: 'Mật khẩu không đúng '
        });
        return;
      }
      if (customer && checkPassword) {
        const access_token = generalAcessToken({
          id: customer.id
        });
        const refresh_token = generalRefreshToken({
          id: customer.id
        });
        delete customer.password;
        resolve({
          customer,
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
exports.loginCustomerServices = loginCustomerServices;
const getAllCustomerServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await _models.default.Customer.findAll({
        attributes: {
          exclude: ['password']
        },
        raw: true,
        nest: true
      });
      if (!data) {
        resolve({
          errCode: 1,
          message: 'Customer not found'
        });
        return;
      }
      resolve({
        data,
        errCode: 0,
        message: 'get all Customer success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.getAllCustomerServices = getAllCustomerServices;
const getSingleCustomerServices = id => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const data = await _models.default.Customer.findOne({
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
          message: 'Customer not found'
        });
        return;
      }
      resolve({
        data,
        errCode: 0,
        message: 'get single Customer success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.getSingleCustomerServices = getSingleCustomerServices;
const refreshTokenCustomerService = token => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_REFRESH_TOKEN, (err, user) => {
        if (err) {
          resolve({
            errCode: -1,
            message: 'User is not authentication '
          });
          return;
        }
        if (user) {
          const newAccessToken = generalAcessToken({
            id: user.id
          });
          resolve({
            errCode: 0,
            message: 'refreshToken  success',
            access_token: newAccessToken
          });
        } else {
          resolve({
            errCode: 1,
            message: 'User newAccessToken failed '
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.refreshTokenCustomerService = refreshTokenCustomerService;
const updateCustomerService = data => {
  return new Promise(async (resolve, reject) => {
    const {
      id,
      firstName,
      lastName,
      shipAddress,
      phoneNumber,
      gender
    } = data;
    try {
      if (!id || !firstName || !lastName || !shipAddress || !phoneNumber || !gender) {
        resolve({
          errCode: 1,
          message: "missing parameter "
        });
      }
      const user = await _models.default.Customer.findOne({
        where: {
          id: id
        },
        raw: true
      });
      if (user) {
        await _models.default.Customer.update({
          firstName: firstName,
          lastName: lastName,
          shipAddress: shipAddress,
          phoneNumber: phoneNumber,
          gender: gender
        }, {
          where: {
            id: id
          }
        });
        resolve({
          errCode: 0,
          message: 'update customer success'
        });
      } else {
        resolve({
          errCode: 2,
          message: 'customer not found'
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.updateCustomerService = updateCustomerService;