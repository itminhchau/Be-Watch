"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUpdateCustomer = exports.handleRegisterCustomer = exports.handleRefreshTokenCustomer = exports.handleLoginCustomer = exports.handleGetSingleCustomer = exports.handleGetAllCustomer = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleRegisterCustomer = async (req, res) => {
  try {
    const data = await (0, _services.registerCustomerServices)(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleRegisterCustomer = handleRegisterCustomer;
const handleLoginCustomer = async (req, res) => {
  try {
    const data = await (0, _services.loginCustomerServices)(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleLoginCustomer = handleLoginCustomer;
const handleGetAllCustomer = async (req, res) => {
  try {
    const data = await (0, _services.getAllCustomerServices)();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetAllCustomer = handleGetAllCustomer;
const handleGetSingleCustomer = async (req, res) => {
  try {
    const data = await (0, _services.getSingleCustomerServices)(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetSingleCustomer = handleGetSingleCustomer;
const handleRefreshTokenCustomer = async (req, res) => {
  try {
    const token = req.headers.token.split(' ')[1];
    if (token) {
      const data = await (0, _services.refreshTokenCustomerService)(token);
      return res.status(200).json(data);
    } else {
      return res.status(200).json({
        errCode: -1,
        message: 'RefreshToken is not valid'
      });
    }
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleRefreshTokenCustomer = handleRefreshTokenCustomer;
const handleUpdateCustomer = async (req, res) => {
  try {
    const data = await (0, _services.updateCustomerService)(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleUpdateCustomer = handleUpdateCustomer;