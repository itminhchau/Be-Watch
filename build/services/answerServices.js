"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnswerServices = void 0;
require("core-js/modules/es.promise.js");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createAnswerServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idCustomer,
      idQuestion,
      content
    } = data;
    try {
      if (!idCustomer || !idQuestion || !content) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      await _models.default.Answer.create({
        idCustomer,
        idQuestion,
        content
      });
      resolve({
        errCode: 0,
        message: 'create Answer success'
      });
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
exports.createAnswerServices = createAnswerServices;