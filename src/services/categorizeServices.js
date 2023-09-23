import db from '../models';
export const getAllCategorizeService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Categorize.findAll();
      resolve({
        errorCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
