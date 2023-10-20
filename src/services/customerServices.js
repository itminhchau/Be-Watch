import db from '../models';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//genaral accesstoken
const generalAcessToken = (data) => {
  const access_token = jwt.sign(data, process.env.JWT_ACCESS_KEY, { expiresIn: '2h' });
  return access_token;
};
//genaral accesstoken
const generalRefreshToken = (data) => {
  const refresh_token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN, { expiresIn: '365d' });
  return refresh_token;
};
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
export const registerCustomerServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { firstName, lastName, email, password, shipAddress, phoneNumber, gender } = data;
    try {
      if (!firstName || !lastName || !email || !password || !shipAddress || !phoneNumber || !gender) {
        resolve({
          errCode: 1,
          message: `missing parameter `,
        });
        return;
      }
      let emailExists = await db.Customer.findOne({
        where: { email: email },
      });
      if (emailExists) {
        resolve({
          errCode: 1,
          message: 'Email đã tồn tại',
        });
        return;
      }

      let hashPasswordFormBcrypt = await hashUserPassword(password);
      await db.Customer.create({
        firstName,
        lastName,
        email,
        password: hashPasswordFormBcrypt,
        shipAddress,
        phoneNumber,
        gender,
      });
      resolve({
        errCode: 0,
        errMessage: 'Register Customer success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const loginCustomerServices = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email || !password) {
        resolve({
          errCode: 1,
          message: `missing parameter `,
        });
        return;
      }
      const customer = await db.Customer.findOne({
        where: { email: email },
        raw: true,
      });
      if (!customer) {
        resolve({
          errCode: 1,
          message: 'Email không chính xác hoặc không tồn tại',
        });
        return;
      }

      const checkPassword = await bcrypt.compareSync(password, customer.password);
      if (!checkPassword) {
        resolve({
          errCode: 1,
          message: 'Mật khẩu không đúng ',
        });
        return;
      }
      if (customer && checkPassword) {
        const access_token = generalAcessToken({ id: customer.id });
        const refresh_token = generalRefreshToken({ id: customer.id });
        delete customer.password;
        resolve({
          customer,
          access_token,
          refresh_token,
          errCode: 0,
          message: 'login success',
        });
        return;
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllCustomerServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Customer.findAll({
        attributes: {
          exclude: ['password'],
        },
        raw: true,
        nest: true,
      });
      if (!data) {
        resolve({
          errCode: 1,
          message: 'Customer not found',
        });
        return;
      }
      resolve({
        data,
        errCode: 0,
        message: 'get all Customer success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getSingleCustomerServices = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const data = await db.Customer.findOne({
        where: { id: id },
        attributes: {
          exclude: ['password'],
        },
        raw: true,
        nest: true,
      });
      if (!data) {
        resolve({
          errCode: 1,
          message: 'Customer not found',
        });
        return;
      }
      resolve({
        data,
        errCode: 0,
        message: 'get single Customer success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const refreshTokenCustomerService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_REFRESH_TOKEN, (err, user) => {
        if (err) {
          resolve({
            errCode: -1,
            message: 'User is not authentication ',
          });
          return;
        }
        if (user) {
          const newAccessToken = generalAcessToken({ id: user.id });
          resolve({
            errCode: 0,
            message: 'refreshToken  success',
            access_token: newAccessToken,
          });
        } else {
          resolve({
            errCode: 1,
            message: 'User newAccessToken failed ',
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
