"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUpdatePromotion = exports.handleGetBiggestProductPromotion = exports.handleGetAllPromotions = exports.handleCreatePromotion = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreatePromotion = async (req, res) => {
  try {
    const data = await (0, _services.createPromotionService)(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleCreatePromotion = handleCreatePromotion;
const handleUpdatePromotion = async (req, res) => {
  try {
    const data = await (0, _services.updatePromotionService)(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleUpdatePromotion = handleUpdatePromotion;
const handleGetAllPromotions = async (req, res) => {
  try {
    const data = await (0, _services.getAllPromotionService)();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetAllPromotions = handleGetAllPromotions;
const handleGetBiggestProductPromotion = async (req, res) => {
  try {
    const data = await (0, _services.getBiggestProductPromotionService)();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetBiggestProductPromotion = handleGetBiggestProductPromotion;