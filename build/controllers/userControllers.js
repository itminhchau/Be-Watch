"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUpdateUser = exports.handleRegisterUser = exports.handleLoginUser = exports.handleGetSingleUser = exports.handleGetAllUser = exports.handleDeleteSingleUser = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleRegisterUser = async (req, res) => {
  try {
    const data = await (0, _services.registerUserServices)(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleRegisterUser = handleRegisterUser;
const handleLoginUser = async (req, res) => {
  try {
    const data = await (0, _services.loginUserServices)(req.body.email, req.body.password);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleLoginUser = handleLoginUser;
const handleGetAllUser = async (req, res) => {
  try {
    const data = await (0, _services.getAllUserServices)();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetAllUser = handleGetAllUser;
const handleGetSingleUser = async (req, res) => {
  try {
    const data = await (0, _services.getSingleUserServices)(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetSingleUser = handleGetSingleUser;
const handleDeleteSingleUser = async (req, res) => {
  try {
    const data = await (0, _services.deleteSingleUserServices)(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleDeleteSingleUser = handleDeleteSingleUser;
const handleUpdateUser = async (req, res) => {
  try {
    const data = await (0, _services.updateUserServices)(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleUpdateUser = handleUpdateUser;