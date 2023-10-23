import db from '../models';

export const createOrdertServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idCustomer, totalPrice, status } = data;
    try {
      if (!idCustomer || !totalPrice || !status) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const data = await db.Order.create({
        idCustomer: parseInt(idCustomer),
        totalPrice: parseFloat(totalPrice),
        status,
      });

      resolve({
        data,
        errCode: 0,
        message: 'create Order success',
      });
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
