import db from '../models';

export const createImageProductServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idProduct, idColor, url, stock } = data;
    try {
      if (!idProduct || !idColor || !url || !stock) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const data = await db.ImageProduct.create({
        idProduct,
        idColor,
        url,
        stock,
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

export const getImageProductService = (idProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ImageProduct.findAll({
        where: { idProduct: idProduct },
        include: [{ model: db.Color, as: 'colorProduct' }],
        raw: true,
        nest: true,
      });
      resolve({
        data,
        errCode: 0,
        message: 'oke',
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getImageProductOfIdProductAndIdColorServices = (idProduct, idColor) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.ImageProduct.findAll({
        where: { idProduct: idProduct, idColor: idColor },
        raw: true,
        nest: true,
      });
      resolve({
        data,
        errCode: 0,
        message: 'oke',
      });
    } catch (error) {
      reject(error);
    }
  });
};
