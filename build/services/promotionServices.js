"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePromotionService = exports.getBiggestProductPromotionService = exports.getAllPromotionService = exports.createPromotionService = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.symbol.description.js");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const createPromotionService = data => {
  return new Promise(async (resolve, reject) => {
    const {
      description,
      valuePromotion,
      expDate
    } = data;
    try {
      if (!description || !valuePromotion || !expDate) {
        resolve({
          errCode: 1,
          message: "missing parameter "
        });
        return;
      }
      await _models.default.Promotion.create({
        description,
        valuePromotion,
        expDate
      });
      resolve({
        errCode: 0,
        message: 'create Promotion success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.createPromotionService = createPromotionService;
const updatePromotionService = data => {
  return new Promise(async (resolve, reject) => {
    const {
      id,
      description,
      valuePromotion,
      expDate
    } = data;
    try {
      if (!id || !description || !expDate) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const promotion = await _models.default.Promotion.findOne({
        where: {
          id: id
        },
        raw: true
      });
      if (promotion) {
        await _models.default.Promotion.update({
          description: description,
          valuePromotion: valuePromotion,
          expDate: expDate
        }, {
          where: {
            id: id
          }
        });
        resolve({
          errCode: 0,
          message: 'update promotion success'
        });
      } else {
        resolve({
          errCode: 2,
          message: 'promotion not found'
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.updatePromotionService = updatePromotionService;
const getAllPromotionService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await _models.default.Promotion.findAll({
        raw: true,
        nest: true
      });
      resolve({
        data,
        errCode: 0,
        message: 'get all Promotion success'
      });
    } catch (error) {
      reject(error);
    }
  });
};

// lấy hạn ngày sản phẩm có khuyến mãi lớn nhất.
exports.getAllPromotionService = getAllPromotionService;
const getBiggestProductPromotionService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const maxPromotion = await _models.default.Promotion.max('valuePromotion');
      const promotion = await _models.default.Promotion.findOne({
        where: {
          valuePromotion: maxPromotion
        }
      });
      if (promotion) {
        const product = await _models.default.Product.findOne({
          where: {
            idPromotion: promotion.id
          },
          attributes: {
            exclude: ['shortDescription', 'description', 'updatedAt', 'createdAt', 'quantitySold', 'rate', 'idPromotion', 'idBrand']
          },
          raw: true
        });
        resolve(_objectSpread(_objectSpread({}, product), {}, {
          promotion: promotion.valuePromotion,
          expDate: promotion.expDate
        }));
      }
    } catch (error) {
      console.log('check error', error);
      reject(error);
    }
  });
};
exports.getBiggestProductPromotionService = getBiggestProductPromotionService;