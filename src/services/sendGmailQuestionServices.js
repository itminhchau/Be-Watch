import * as dotenv from 'dotenv';
dotenv.config();
const nodemailer = require('nodemailer');
const sendEmailQuestion = async (data) => {
  const { userName, content, link } = data;
  let port = process.env.PORT_CLIENT;
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
  let htmlContent = '<h2>Câu Hỏi Sản Phẩm</h2>';
  htmlContent +=
    '<tr style="background-color: #04AA6D; color: white;"><th style="border: 1px solid #dddddd; padding: 8px;">Tên</th><th style="border: 1px solid #dddddd; padding: 8px;">Nội dung</th><th style="border: 1px solid #dddddd; padding: 8px;">Link sản phẩm</th></tr>';
  // tạo nội dung gửi về cho chủ shop
  htmlContent += `<tr><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${userName}</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${content}</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${
    process.env.PORT_CLIENT + link
  }
 </td></tr>`;
  const owner = await transporter.sendMail({
    from: '"Watchsc 👻" <mywatchsc@gmail.com>', // sender address
    to: 'mywatchsc@gmail.com', // list of receivers
    subject: 'Câu Hỏi Sản Phẩm ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: htmlContent, // html body
  });
};

export default sendEmailQuestion;
