"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var cron = require('node-cron');
const Sequelize = require('sequelize');
async function updateProducts() {
  try {
    const currentDate = Date.parse(new Date()) / 1000;
    console.log(currentDate);
    //  Tìm các khuyến mãi đã hết hạn
    const expiredPromotions = await _models.default.Promotion.findAll({
      where: {
        expDate: {
          [Sequelize.Op.lt]: currentDate
        }
      }
    });
    console.log('tim', expiredPromotions);
    // Cập nhật các sản phẩm có idPromotion chứa khuyến mãi hết hạn về idPromotion = 0
    for (const promotion of expiredPromotions) {
      await _models.default.Product.update({
        idPromotion: 0
      }, {
        where: {
          idPromotion: promotion.id
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// Lên lịch chạy công việc mỗi giờ
var task = cron.schedule('0 0 * * *', () => {
  console.log('Chạy cập nhật sản phẩm');
  updateProducts();
});
var _default = exports.default = task;