import db from '../models';
import sendEmailQuestion from './sendGmailQuestionServices';

export const createQuestionServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idCustomer, idProduct, content, userName, link } = data;
    try {
      if (!idCustomer || !idProduct || !content) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      await sendEmailQuestion({ userName, content, link });
      await db.Question.create({
        idCustomer,
        idProduct,
        content,
      });
      resolve({
        errCode: 0,
        message: 'create question success',
      });
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};

export const getQuestionServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idProduct, page, limit } = data;
    try {
      if (!idProduct || !page || !limit) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      let offset = (page - 1) * limit;
      const count = await db.Question.count({
        where: { idProduct: parseInt(idProduct) },
      });
      const questions = await db.Question.findAll({
        where: { idProduct: parseInt(idProduct) },
        offset,
        limit: parseInt(limit),
        raw: true,
        nest: true,
        include: [
          {
            model: db.Customer,
            as: 'questionCt',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'userName', 'password', 'shipAddress', 'phoneNumber', 'gender'],
            },
          },
          {
            model: db.Answer,
            as: 'anwerQs',
            include: [
              {
                model: db.Customer,
                as: 'answerCt',
                attributes: {
                  exclude: ['updatedAt', 'userName', 'password', 'shipAddress', 'phoneNumber', 'gender'],
                },
              },
            ],
            attributes: {
              exclude: ['updatedAt'],
            },
          },
        ],
      });

      const uniqueQuestion = {}; // Sử dụng một đối tượng để lưu trữ các sản phẩm duy nhất

      questions.forEach((question) => {
        // Nếu sản phẩm chưa tồn tại trong đối tượng uniqueQuestion, thêm vào
        if (!uniqueQuestion[question.id]) {
          uniqueQuestion[question.id] = {
            ...question,
            anwerQs: [question.anwerQs], // Gán danh sách hình ảnh cho sản phẩm
          };
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
          total: count,
        },
        errCode: 0,
        message: 'get success',
      });
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
