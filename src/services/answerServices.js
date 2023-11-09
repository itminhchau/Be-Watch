import db from '../models';

export const createAnswerServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idCustomer, idQuestion, content } = data;
    try {
      if (!idCustomer || !idQuestion || !content) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      await db.Answer.create({
        idCustomer,
        idQuestion,
        content,
      });
      resolve({
        errCode: 0,
        message: 'create Answer success',
      });
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
