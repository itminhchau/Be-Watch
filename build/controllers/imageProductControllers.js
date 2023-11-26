"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGetImageProductOfIdProductAndIdColor = exports.handleGetImageProduct = exports.createImageProduct = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const createImageProduct = async (req, res) => {
  try {
    const data = await (0, _services.createImageProductServices)(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.createImageProduct = createImageProduct;
const handleGetImageProduct = async (req, res) => {
  try {
    const data = await (0, _services.getImageProductService)(req.query.idProduct);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetImageProduct = handleGetImageProduct;
const handleGetImageProductOfIdProductAndIdColor = async (req, res) => {
  try {
    const data = await (0, _services.getImageProductOfIdProductAndIdColorServices)(req.query.idProduct, req.query.idColor);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetImageProductOfIdProductAndIdColor = handleGetImageProductOfIdProductAndIdColor;