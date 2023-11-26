"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReviewProduct = exports.getAvgStar = exports.createReviewServices = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.parse-int.js");
var _models = _interopRequireWildcard(require("../models"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const createReviewServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idProduct,
      content,
      star,
      userName,
      phoneNumber
    } = data;
    try {
      if (!idProduct || !content || !star || !userName || !phoneNumber) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      await _models.default.Review.create({
        idProduct,
        content,
        star,
        userName,
        phoneNumber
      });
      resolve({
        errCode: 0,
        message: 'create review success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.createReviewServices = createReviewServices;
const getReviewProduct = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idProduct,
      limit,
      page,
      numberStar,
      newReview
    } = data;
    try {
      if (!idProduct || !page || !limit) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const where = {};
      const order = [];
      let offset = (page - 1) * limit;
      if (idProduct) {
        where.idProduct = idProduct;
      }
      if (numberStar) {
        where.star = parseInt(numberStar);
      }
      if (newReview === 'DESC') {
        order.push([['createdAt', 'DESC']]);
      }
      const review = await _models.default.Review.findAll({
        offset,
        limit: parseInt(limit),
        where,
        order,
        raw: true
      });
      resolve({
        data: review,
        pagination: {
          page,
          limit
          // total: count,
        },

        errCode: 0,
        message: 'oke'
      });
    } catch (error) {
      console.log('check loi ', error);
      reject(error);
    }
  });
};
exports.getReviewProduct = getReviewProduct;
const getAvgStar = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idProduct
    } = data;
    try {
      if (!idProduct) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const where = {};
      if (idProduct) {
        where.idProduct = idProduct;
      }
      const star = await _models.default.Review.findAll({
        where,
        attributes: ['star']
      });
      let sum = 0;
      star.forEach(item => {
        sum += item.star;
      });
      const avgStar = sum / star.length;
      const total = star.length;
      const coutStar = await _models.default.Review.findAll({
        where,
        attributes: ['star', [_models.Sequelize.fn('COUNT', _models.Sequelize.col('star')), 'count']],
        group: ['star']
      });
      resolve({
        total: total,
        avgStar: avgStar,
        coutStar,
        errCode: 0,
        message: 'oke'
      });
    } catch (error) {
      console.log('check loi ', error);
      reject(error);
    }
  });
};
exports.getAvgStar = getAvgStar;