import db from '../models';

export const createCartServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idProduct, idCustomer, quantity, status } = data;
    console.log(data);
    try {
      if (!idProduct || !idCustomer || !quantity || !status) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const data = await db.Cart.create({
        idProduct: parseInt(idProduct),
        idCustomer: parseInt(idCustomer),
        quantity: parseInt(quantity),
        status,
      });

      console.log('data return', data);
      resolve({
        errCode: 0,
        message: 'create cart success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
