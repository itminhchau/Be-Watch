"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllBrandServices = void 0;
require("core-js/modules/es.promise.js");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAllBrandServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await _models.default.Brand.findAll({
        raw: true,
        nest: true
      });
      resolve({
        data,
        errCode: 0,
        message: 'get all brand success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.getAllBrandServices = getAllBrandServices;