"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGetQuestion = exports.handleCreateQuestion = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreateQuestion = async (req, res) => {
  try {
    const data = await (0, _services.createQuestionServices)(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleCreateQuestion = handleCreateQuestion;
const handleGetQuestion = async (req, res) => {
  try {
    const data = await (0, _services.getQuestionServices)(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleGetQuestion = handleGetQuestion;