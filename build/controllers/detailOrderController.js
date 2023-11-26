"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGetDetailOrder = exports.handleCreateDetailOrder = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreateDetailOrder = async (req, res) => {
  try {
    const data = await (0, _services.createDetailOrdertServices)(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleCreateDetailOrder = handleCreateDetailOrder;
const handleGetDetailOrder = async (req, res) => {
  try {
    const data = await (0, _services.getDetailOrderServices)(req.query.idCustomer);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleGetDetailOrder = handleGetDetailOrder;