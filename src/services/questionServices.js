import db from '../models';

export const createQuestionServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idCustomer, idProduct, content } = data;
    try {
      if (!idCustomer || !idProduct || !content) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
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
    const { idCustomer, idProduct } = data;
    try {
      if (!idCustomer || !idProduct) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const data = await db.Question.findAll({
        where: { idProduct: parseInt(idProduct), idCustomer: parseInt(idProduct) },
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
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
      });
      resolve({
        data,
        errCode: 0,
        message: 'get success',
      });
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
