"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCreateOrder = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreateOrder = async (req, res) => {
  try {
    const data = await (0, _services.createOrdertServices)(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleCreateOrder = handleCreateOrder;