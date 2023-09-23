import db from '../models';
export const getAllSizeServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Size.findAll();
      resolve({
        errorCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
