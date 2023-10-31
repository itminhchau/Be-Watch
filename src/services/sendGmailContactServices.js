import * as dotenv from 'dotenv';
dotenv.config();
const nodemailer = require('nodemailer');
const sendEmailContact = async (data) => {
  const { email, userName, message } = data;

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
  let htmlContent = '<h2>Thông tin câu hỏi </h2>';
  htmlContent +=
    '<tr style="background-color: #04AA6D; color: white;"><th style="border: 1px solid #dddddd; padding: 8px;">Email</th><th style="border: 1px solid #dddddd; padding: 8px;">Tên khách hàng</th><th style="border: 1px solid #dddddd; padding: 8px;">Tin nhắn</th></tr>';
  // tạo nội dung gửi về cho chủ shop
  htmlContent += `<tr><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${email}</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${userName}</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${message}</td></tr>`;
  const owner = await transporter.sendMail({
    from: '"Watchsc 👻" <mywatchsc@gmail.com>', // sender address
    to: 'mywatchsc@gmail.com', // list of receivers
    subject: 'Thông tin câu hỏi ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: htmlContent, // html body
  });
};

export default sendEmailContact;
