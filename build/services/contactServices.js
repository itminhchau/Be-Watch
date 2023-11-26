"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContactServices = void 0;
require("core-js/modules/es.promise.js");
var _sendGmailContactServices = _interopRequireDefault(require("./sendGmailContactServices"));
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createContactServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      email,
      userName,
      message
    } = data;
    try {
      if (!email || !userName || !message) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      await (0, _sendGmailContactServices.default)({
        email,
        userName,
        message
      });
      await _models.default.Contact.create({
        email,
        userName,
        message
      });
      resolve({
        errCode: 0,
        message: 'create contact success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.createContactServices = createContactServices;