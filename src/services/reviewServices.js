import db, { Sequelize } from '../models';

export const createReviewServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idProduct, content, star, userName, phoneNumber } = data;

    try {
      if (!idProduct || !content || !star || !userName || !phoneNumber) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }

      await db.Review.create({
        idProduct,
        content,
        star,
        userName,
        phoneNumber,
      });
      resolve({
        errCode: 0,
        message: 'create review success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getReviewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idProduct, limit, page, numberStar, newReview } = data;
    try {
      if (!idProduct || !page || !limit) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const where = {};
      const order = [];

      let offset = (page - 1) * limit;

      if (idProduct) {
        where.idProduct = idProduct;
      }
      if (numberStar) {
        where.star = parseInt(numberStar);
      }
      if (newReview === 'DESC') {
        order.push([['createdAt', 'DESC']]);
      }

      const review = await db.Review.findAll({
        offset,
        limit: parseInt(limit),
        where,
        order,
        raw: true,
      });

      resolve({
        data: review,
        pagination: {
          page,
          limit,
          // total: count,
        },
        errCode: 0,
        message: 'oke',
      });
    } catch (error) {
      console.log('check loi ', error);
      reject(error);
    }
  });
};
export const getAvgStar = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idProduct } = data;
    try {
      if (!idProduct) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const where = {};
      if (idProduct) {
        where.idProduct = idProduct;
      }
      const star = await db.Review.findAll({
        where,
        attributes: ['star'],
      });

      let sum = 0;
      star.forEach((item) => {
        sum += item.star;
      });

      const avgStar = sum / star.length;
      const total = star.length;
      const coutStar = await db.Review.findAll({
        where,
        attributes: ['star', [Sequelize.fn('COUNT', Sequelize.col('star')), 'count']],
        group: ['star'],
      });
      resolve({
        total: total,
        avgStar: avgStar,
        coutStar,
        errCode: 0,
        message: 'oke',
      });
    } catch (error) {
      console.log('check loi ', error);
      reject(error);
    }
  });
};
