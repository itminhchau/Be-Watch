"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllColorServices = exports.createColorServices = void 0;
require("core-js/modules/es.promise.js");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createColorServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      hexCode,
      nameColor
    } = data;
    try {
      if (!hexCode || !nameColor) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      await _models.default.Color.create({
        hexCode,
        nameColor
      });
      resolve({
        errCode: 0,
        message: 'create color success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.createColorServices = createColorServices;
const getAllColorServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await _models.default.Color.findAll();
      resolve({
        data,
        errCode: 0,
        message: 'get all color success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.getAllColorServices = getAllColorServices;