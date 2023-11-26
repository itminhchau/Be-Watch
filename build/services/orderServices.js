"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrdertServices = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.parse-int.js");
var _models = _interopRequireDefault(require("../models"));
var _sendGmailServices = _interopRequireDefault(require("./sendGmailServices"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOrdertServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idCustomer,
      totalPrice,
      status,
      email,
      arrayItemCart,
      fee,
      inforCustomer,
      itemOrderMethodStatus
    } = data;
    try {
      if (!idCustomer || !totalPrice || !status || !email || !arrayItemCart || !fee || !inforCustomer || !itemOrderMethodStatus) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const newTotalPrice = parseFloat(totalPrice);
      const res = await (0, _sendGmailServices.default)({
        email,
        arrayItemCart,
        newTotalPrice,
        fee,
        inforCustomer,
        itemOrderMethodStatus
      });
      console.log('check res email', res);
      if (res.errcode === 0) {
        const data = await _models.default.Order.create({
          idCustomer: parseInt(idCustomer),
          totalPrice: newTotalPrice,
          status
        });
        resolve({
          data,
          errCode: 0,
          message: 'create Order success'
        });
      } else {
        resolve({
          errCode: 2,
          message: 'gmail khong ton tai'
        });
      }
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
exports.createOrdertServices = createOrdertServices;