import db from '../models';

export const getAllBrandServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Brand.findAll({
        raw: true,
        nest: true,
      });
      resolve({
        data,
        errCode: 0,
        message: 'get all brand success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
