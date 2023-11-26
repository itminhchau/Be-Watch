"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUpdateQuantityCart = exports.handleGetAllCart = exports.handleDeleteCart = exports.handleCreateCart = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreateCart = async (req, res) => {
  const value = req.body;
  try {
    const data = await (0, _services.createCartServices)(value);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleCreateCart = handleCreateCart;
const handleGetAllCart = async (req, res) => {
  try {
    const data = await (0, _services.getAllCartServices)(req.query.idCustomer);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleGetAllCart = handleGetAllCart;
const handleDeleteCart = async (req, res) => {
  try {
    const data = await (0, _services.deleteCartServices)(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleDeleteCart = handleDeleteCart;
const handleUpdateQuantityCart = async (req, res) => {
  try {
    const {
      id,
      mode
    } = req.body;
    const data = await (0, _services.updateQuantityCartServices)(id, mode);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleUpdateQuantityCart = handleUpdateQuantityCart;