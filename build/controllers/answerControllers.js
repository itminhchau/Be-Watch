"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCreateAnswer = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreateAnswer = async (req, res) => {
  try {
    const data = await (0, _services.createAnswerServices)(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleCreateAnswer = handleCreateAnswer;