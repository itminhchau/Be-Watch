import db from '../models';

export const createPromotionService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { description, valuePromotion, expDate } = data;
    try {
      if (!description || !valuePromotion || !expDate) {
        resolve({
          errCode: 1,
          message: `missing parameter `,
        });
        return;
      }
      await db.Promotion.create({
        description,
        valuePromotion,
        expDate,
      });
      resolve({
        errCode: 0,
        message: 'create Promotion success',
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const updatePromotionService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { id, description, valuePromotion, expDate } = data;
    try {
      if (!id || !description || !expDate) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const promotion = await db.Promotion.findOne({
        where: { id: id },
        raw: true,
      });
      if (promotion) {
        await db.Promotion.update(
          {
            description: description,
            valuePromotion: valuePromotion,
            expDate: expDate,
          },
          {
            where: { id: id },
          }
        );
        resolve({
          errCode: 0,
          message: 'update promotion success',
        });
      } else {
        resolve({
          errCode: 2,
          message: 'promotion not found',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllPromotionService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Promotion.findAll({
        raw: true,
        nest: true,
      });
      resolve({
        data,
        errCode: 0,
        message: 'get all Promotion success',
      });
    } catch (error) {
      reject(error);
    }
  });
};

// lấy hạn ngày sản phẩm có khuyến mãi lớn nhất.
export const getBiggestProductPromotionService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const maxPromotion = await db.Promotion.max('valuePromotion');
      const promotion = await db.Promotion.findOne({
        where: {
          valuePromotion: maxPromotion,
        },
      });

      if (promotion) {
        const product = await db.Product.findOne({
          where: { idPromotion: promotion.id },
          attributes: {
            exclude: [
              'shortDescription',
              'description',
              'updatedAt',
              'createdAt',
              'quantitySold',
              'rate',
              'idPromotion',
              'idBrand',
            ],
          },
          raw: true,
        });

        resolve({
          ...product,
          promotion: promotion.valuePromotion,
          expDate: promotion.expDate,
        });
      }
    } catch (error) {
      console.log('check error', error);
      reject(error);
    }
  });
};
