import db from '../models';

export const createColorServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { hexCode, nameColor } = data;

    try {
      if (!hexCode || !nameColor) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }

      await db.Color.create({
        hexCode,
        nameColor,
      });
      resolve({
        errCode: 0,
        message: 'create color success',
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllColorServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Color.findAll();
      resolve({
        data,
        errCode: 0,
        message: 'get all color success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
