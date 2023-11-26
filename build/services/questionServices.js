"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuestionServices = exports.createQuestionServices = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.parse-int.js");
var _models = _interopRequireDefault(require("../models"));
var _sendGmailQuestionServices = _interopRequireDefault(require("./sendGmailQuestionServices"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const createQuestionServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idCustomer,
      idProduct,
      content,
      userName,
      link
    } = data;
    try {
      if (!idCustomer || !idProduct || !content) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      await (0, _sendGmailQuestionServices.default)({
        userName,
        content,
        link
      });
      await _models.default.Question.create({
        idCustomer,
        idProduct,
        content
      });
      resolve({
        errCode: 0,
        message: 'create question success'
      });
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
exports.createQuestionServices = createQuestionServices;
const getQuestionServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idProduct,
      page,
      limit
    } = data;
    try {
      if (!idProduct || !page || !limit) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      let offset = (page - 1) * limit;
      const count = await _models.default.Question.count({
        where: {
          idProduct: parseInt(idProduct)
        }
      });
      const questions = await _models.default.Question.findAll({
        where: {
          idProduct: parseInt(idProduct)
        },
        offset,
        limit: parseInt(limit),
        raw: true,
        nest: true,
        include: [{
          model: _models.default.Customer,
          as: 'questionCt',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'userName', 'password', 'shipAddress', 'phoneNumber', 'gender']
          }
        }, {
          model: _models.default.Answer,
          as: 'anwerQs',
          include: [{
            model: _models.default.Customer,
            as: 'answerCt',
            attributes: {
              exclude: ['updatedAt', 'userName', 'password', 'shipAddress', 'phoneNumber', 'gender']
            }
          }],
          attributes: {
            exclude: ['updatedAt']
          }
        }]
      });
      const uniqueQuestion = {}; // Sử dụng một đối tượng để lưu trữ các sản phẩm duy nhất

      questions.forEach(question => {
        // Nếu sản phẩm chưa tồn tại trong đối tượng uniqueQuestion, thêm vào
        if (!uniqueQuestion[question.id]) {
          uniqueQuestion[question.id] = _objectSpread(_objectSpread({}, question), {}, {
            anwerQs: [question.anwerQs] // Gán danh sách hình ảnh cho sản phẩm
          });
        } else {
          // Nếu sản phẩm đã tồn tại, chỉ cần thêm hình ảnh vào danh sách

          uniqueQuestion[question.id].anwerQs.push(question.anwerQs);
        }
      });
      const formattedQuestion = Object.values(uniqueQuestion); // Chuyển đối tượng thành mảng

      resolve({
        data: formattedQuestion,
        pagination: {
          page,
          limit,
          total: count
        },
        errCode: 0,
        message: 'get success'
      });
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
exports.getQuestionServices = getQuestionServices;