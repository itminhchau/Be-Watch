"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImageProductService = exports.getImageProductOfIdProductAndIdColorServices = exports.createImageProductServices = void 0;
require("core-js/modules/es.promise.js");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createImageProductServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idProduct,
      idColor,
      url,
      stock
    } = data;
    try {
      if (!idProduct || !idColor || !url || !stock) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const data = await _models.default.ImageProduct.create({
        idProduct,
        idColor,
        url,
        stock
      });
      resolve({
        data,
        errCode: 0,
        message: 'success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.createImageProductServices = createImageProductServices;
const getImageProductService = idProduct => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await _models.default.ImageProduct.findAll({
        where: {
          idProduct: idProduct
        },
        include: [{
          model: _models.default.Color,
          as: 'colorProduct'
        }],
        raw: true,
        nest: true
      });
      resolve({
        data,
        errCode: 0,
        message: 'oke'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.getImageProductService = getImageProductService;
const getImageProductOfIdProductAndIdColorServices = (idProduct, idColor) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await _models.default.ImageProduct.findOne({
        where: {
          idProduct: idProduct,
          idColor: idColor
        },
        raw: true,
        nest: true
      });
      resolve({
        data,
        errCode: 0,
        message: 'oke'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.getImageProductOfIdProductAndIdColorServices = getImageProductOfIdProductAndIdColorServices;