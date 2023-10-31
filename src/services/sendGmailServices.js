import * as dotenv from 'dotenv';
import { formatPrice } from '../constant/formatPrice';
dotenv.config();
const nodemailer = require('nodemailer');
const sendSimpleEmail = async (data) => {
  const { email, arrayItemCart, newTotalPrice, fee, inforCustomer, itemOrderMethodStatus } = data;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // Tạo nội dung email với bảng HTML động
  let htmlContent = '<h2>Thông tin đơn hàng của bạn </h2>';

  htmlContent += '<table style="width:100%; border-collapse: collapse;">';
  htmlContent +=
    '<tr style="background-color: #04AA6D; color: white;"><th style="border: 1px solid #dddddd; padding: 8px;">Tên Sản phẩm</th><th style="border: 1px solid #dddddd; padding: 8px;">Màu</th><th style="border: 1px solid #dddddd; padding: 8px;">Giá Gốc</th><th style="border: 1px solid #dddddd; padding: 8px;">Giá Bán</th><th style="border: 1px solid #dddddd; padding: 8px;">Số lượng</th></tr>';

  arrayItemCart.forEach((row) => {
    htmlContent += `<tr><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
      row.nameProduct
    }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
      row.color
    }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${formatPrice(
      row.price
    )}</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${formatPrice(
      row.salePrice
    )}</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${row.quantity}</td></tr>`;
  });

  htmlContent += '</table>';

  htmlContent += `<h4>Tiền vận chuyển : ${formatPrice(fee)}</h4>`;
  htmlContent += `<h3>Tổng hoá đơn : ${formatPrice(newTotalPrice)}</h3>`;

  // tạo nội dung gửi về cho chủ shop

  let htmlContentOwner = '<h2>Thông tin đơn hàng của khách </h2>';

  htmlContentOwner += '<table style="width:100%; border-collapse: collapse;">';
  htmlContentOwner +=
    '<tr style="background-color: #04AA6D; color: white;"><th style="border: 1px solid #dddddd; padding: 8px;">Tên Sản phẩm</th><th style="border: 1px solid #dddddd; padding: 8px;">Màu</th><th style="border: 1px solid #dddddd; padding: 8px;">Giá Gốc</th><th style="border: 1px solid #dddddd; padding: 8px;">Giá Bán</th><th style="border: 1px solid #dddddd; padding: 8px;">Số lượng</th><th style="border: 1px solid #dddddd; padding: 8px;">Tên</th><th style="border: 1px solid #dddddd; padding: 8px;">Địa chỉ</th><th style="border: 1px solid #dddddd; padding: 8px;">Số Điện thoại</th><th style="border: 1px solid #dddddd; padding: 8px;">email</th><th style="border: 1px solid #dddddd; padding: 8px;">Trạng Thái</th></tr>';

  arrayItemCart.forEach((row) => {
    htmlContentOwner += `<tr><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
      row.nameProduct
    }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
      row.color
    }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${formatPrice(
      row.price
    )}</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${formatPrice(
      row.salePrice
    )}</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
      row.quantity
    }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${inforCustomer.firstName} ${
      inforCustomer.lastName
    }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
      inforCustomer.shipAddress
    }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
      inforCustomer.phoneNumber
    }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
      inforCustomer.email
    }</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${itemOrderMethodStatus}</td></tr>`;
  });

  htmlContentOwner += '</table>';

  htmlContentOwner += `<h4>Tiền vận chuyển : ${formatPrice(fee)}</h4>`;
  htmlContentOwner += `<h3>Tổng hoá đơn : ${formatPrice(newTotalPrice)}</h3>`;

  try {
    const customer = await transporter.sendMail({
      from: '"Watchsc 👻" <mywatchsc@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Thông tin đơn hàng ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: htmlContent, // html body
    });
    const owner = await transporter.sendMail({
      from: '"Watchsc 👻" <mywatchsc@gmail.com>', // sender address
      to: 'mywatchsc@gmail.com', // list of receivers
      subject: 'Thông tin đơn hàng ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: htmlContentOwner, // html body
    });

    return { errcode: 0, message: 'Email sent successfully.' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { errcode: 1, message: 'Error sending email.' };
  }
};

export default sendSimpleEmail;
