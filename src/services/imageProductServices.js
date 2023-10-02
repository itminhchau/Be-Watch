import db from '../models';

export const createImageProductServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idProduct, url } = data;
    try {
      if (!idProduct || !url || !typeImage) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const data = await db.ImageProduct.create({
        idProduct,
        url,
      });
      resolve({
        data,
        errCode: 0,
        message: 'success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
