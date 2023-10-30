import db from '../models';
import sendSimpleEmail from './sendGmailServices';

export const createOrdertServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idCustomer, totalPrice, status, email, arrayItemCart, fee, inforCustomer, itemOrderMethodStatus } = data;
    try {
      if (
        !idCustomer ||
        !totalPrice ||
        !status ||
        !email ||
        !arrayItemCart ||
        !fee ||
        !inforCustomer ||
        !itemOrderMethodStatus
      ) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const newTotalPrice = parseFloat(totalPrice);
      const res = await sendSimpleEmail({
        email,
        arrayItemCart,
        newTotalPrice,
        fee,
        inforCustomer,
        itemOrderMethodStatus,
      });
      console.log('check res email', res);

      if (res.errcode === 0) {
        const data = await db.Order.create({
          idCustomer: parseInt(idCustomer),
          totalPrice: newTotalPrice,
          status,
        });

        resolve({
          data,
          errCode: 0,
          message: 'create Order success',
        });
      } else {
        resolve({
          errCode: 2,
          message: 'gmail khong ton tai',
        });
      }
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
