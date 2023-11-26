"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGetAllColors = exports.handleCreateColor = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreateColor = async (req, res) => {
  try {
    const data = await (0, _services.createColorServices)(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleCreateColor = handleCreateColor;
const handleGetAllColors = async (req, res) => {
  try {
    const data = await (0, _services.getAllColorServices)();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetAllColors = handleGetAllColors;