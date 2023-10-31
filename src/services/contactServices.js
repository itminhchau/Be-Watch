import sendEmailContact from './sendGmailContactServices';
import db from '../models';

export const createContactServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { email, userName, message } = data;

    try {
      if (!email || !userName || !message) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      await sendEmailContact({ email, userName, message });
      await db.Contact.create({
        email,
        userName,
        message,
      });
      resolve({
        errCode: 0,
        message: 'create contact success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
