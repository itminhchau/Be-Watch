import db from '../models';

export const createCartServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { ImageProductId, CustomerId, quantity, status } = data;
    console.log(data);
    try {
      if (!ImageProductId || !CustomerId || !quantity || !status) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const data = await db.Cart.create({
        ImageProductId: parseInt(ImageProductId),
        CustomerId: parseInt(CustomerId),
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
