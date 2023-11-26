"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var dotenv = _interopRequireWildcard(require("dotenv"));
var _formatPrice = require("../constant/formatPrice");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
dotenv.config();
const nodemailer = require('nodemailer');
const sendSimpleEmail = async data => {
  const {
    email,
    arrayItemCart,
    newTotalPrice,
    fee,
    inforCustomer,
    itemOrderMethodStatus
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
  let htmlContent = '<h2>Thông tin đơn hàng của bạn </h2>';
  htmlContent += '<table style="width:100%; border-collapse: collapse;">';
  htmlContent += '<tr style="background-color: #04AA6D; color: white;"><th style="border: 1px solid #dddddd; padding: 8px;">Tên Sản phẩm</th><th style="border: 1px solid #dddddd; padding: 8px;">Màu</th><th style="border: 1px solid #dddddd; padding: 8px;">Giá Gốc</th><th style="border: 1px solid #dddddd; padding: 8px;">Giá Bán</th><th style="border: 1px solid #dddddd; padding: 8px;">Số lượng</th></tr>';
  arrayItemCart.forEach(row => {
    htmlContent += "<tr><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">".concat(row.nameProduct, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(row.color, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat((0, _formatPrice.formatPrice)(row.price), "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat((0, _formatPrice.formatPrice)(row.salePrice), "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(row.quantity, "</td></tr>");
  });
  htmlContent += '</table>';
  htmlContent += "<h4>Ti\u1EC1n v\u1EADn chuy\u1EC3n : ".concat((0, _formatPrice.formatPrice)(fee), "</h4>");
  htmlContent += "<h3>T\u1ED5ng ho\xE1 \u0111\u01A1n : ".concat((0, _formatPrice.formatPrice)(newTotalPrice), "</h3>");

  // tạo nội dung gửi về cho chủ shop

  let htmlContentOwner = '<h2>Thông tin đơn hàng của khách </h2>';
  htmlContentOwner += '<table style="width:100%; border-collapse: collapse;">';
  htmlContentOwner += '<tr style="background-color: #04AA6D; color: white;"><th style="border: 1px solid #dddddd; padding: 8px;">Tên Sản phẩm</th><th style="border: 1px solid #dddddd; padding: 8px;">Màu</th><th style="border: 1px solid #dddddd; padding: 8px;">Giá Gốc</th><th style="border: 1px solid #dddddd; padding: 8px;">Giá Bán</th><th style="border: 1px solid #dddddd; padding: 8px;">Số lượng</th><th style="border: 1px solid #dddddd; padding: 8px;">Tên</th><th style="border: 1px solid #dddddd; padding: 8px;">Địa chỉ</th><th style="border: 1px solid #dddddd; padding: 8px;">Số Điện thoại</th><th style="border: 1px solid #dddddd; padding: 8px;">email</th><th style="border: 1px solid #dddddd; padding: 8px;">Trạng Thái</th></tr>';
  arrayItemCart.forEach(row => {
    htmlContentOwner += "<tr><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">".concat(row.nameProduct, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(row.color, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat((0, _formatPrice.formatPrice)(row.price), "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat((0, _formatPrice.formatPrice)(row.salePrice), "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(row.quantity, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(inforCustomer.firstName, " ").concat(inforCustomer.lastName, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(inforCustomer.shipAddress, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(inforCustomer.phoneNumber, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(inforCustomer.email, "</td><td style=\"border: 1px solid #dddddd; text-align: left; padding: 8px;\">").concat(itemOrderMethodStatus, "</td></tr>");
  });
  htmlContentOwner += '</table>';
  htmlContentOwner += "<h4>Ti\u1EC1n v\u1EADn chuy\u1EC3n : ".concat((0, _formatPrice.formatPrice)(fee), "</h4>");
  htmlContentOwner += "<h3>T\u1ED5ng ho\xE1 \u0111\u01A1n : ".concat((0, _formatPrice.formatPrice)(newTotalPrice), "</h3>");
  try {
    const customer = await transporter.sendMail({
      from: '"Watchsc 👻" <mywatchsc@gmail.com>',
      // sender address
      to: email,
      // list of receivers
      subject: 'Thông tin đơn hàng ✔',
      // Subject line
      text: 'Hello world?',
      // plain text body
      html: htmlContent // html body
    });

    const owner = await transporter.sendMail({
      from: '"Watchsc 👻" <mywatchsc@gmail.com>',
      // sender address
      to: 'mywatchsc@gmail.com',
      // list of receivers
      subject: 'Thông tin đơn hàng ✔',
      // Subject line
      text: 'Hello world?',
      // plain text body
      html: htmlContentOwner // html body
    });

    return {
      errcode: 0,
      message: 'Email sent successfully.'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      errcode: 1,
      message: 'Error sending email.'
    };
  }
};
var _default = exports.default = sendSimpleEmail;