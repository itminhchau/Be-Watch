"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleGetAllBrands = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleGetAllBrands = async (req, res) => {
  try {
    const data = await (0, _services.getAllBrandServices)();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetAllBrands = handleGetAllBrands;