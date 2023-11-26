"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGetReviewProduct = exports.handleGetAvgStar = exports.handleCreateReview = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreateReview = async (req, res) => {
  try {
    const data = await (0, _services.createReviewServices)(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleCreateReview = handleCreateReview;
const handleGetReviewProduct = async (req, res) => {
  try {
    const data = await (0, _services.getReviewProduct)(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleGetReviewProduct = handleGetReviewProduct;
const handleGetAvgStar = async (req, res) => {
  try {
    const data = await (0, _services.getAvgStar)(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server'
    });
  }
};
exports.handleGetAvgStar = handleGetAvgStar;