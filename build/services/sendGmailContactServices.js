"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var dotenv = _interopRequireWildcard(require("dotenv"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
dotenv.config();
const nodemailer = require('nodemailer');
const sendEmailContact = async data => {
  const {
    email,
    userName,
    message
  } = data;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  // Tạo nội dung email với bảng HTML động
  let htmlContent = '<h2>Thông tin câu hỏi </h2>';
  htmlContent += '<tr style="background-color: #04AA6D; color: white;"><th style="border: 1px solid #dddddd; padding: 8px;">Email</th><th style="border: 1px solid #dddddd; padding: 8px;">Tên khách hàng</th><th style="border: 1px solid #dddddd; padding: 8px;">Tin nhắn</th></tr>';
  // tạo nội dung gửi về cho chủ shop
  htmlContent += "<tr><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">".concat(email, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(userName, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(message, "</td></tr>");
  const owner = await transporter.sendMail({
    from: '"Watchsc 👻" <mywatchsc@gmail.com>',
    // sender address
    to: 'mywatchsc@gmail.com',
    // list of receivers
    subject: 'Thông tin câu hỏi ✔',
    // Subject line
    text: 'Hello world?',
    // plain text body
    html: htmlContent // html body
  });
};
var _default = exports.default = sendEmailContact;