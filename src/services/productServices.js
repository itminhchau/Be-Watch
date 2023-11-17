import db, { Sequelize } from '../models';
import imageProduct from '../models/imageProduct';

export const createProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { nameProduct, price, shortDescription, description, quantitySold, rate, idBrand, idPromotion } = data;

    try {
      if (
        !nameProduct ||
        !price ||
        !shortDescription ||
        !description ||
        !quantitySold ||
        !rate ||
        !idBrand ||
        !idPromotion
      ) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }

      await db.Product.create({
        nameProduct,
        price,
        shortDescription,
        description,
        quantitySold,
        rate,
        idPromotion,
        idBrand,
      });
      resolve({
        errCode: 0,
        message: 'create product success',
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getSingleProductService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: 'missing parameter id',
        });
        return;
      }
      const data = await db.Product.findAll({
        where: { id: id },
        include: [
          { model: db.ImageProduct, as: 'imageProduct' },
          { model: db.Promotion, as: 'promotion' },
        ],

        raw: true,
        nest: true,
      });
      if (!data) {
        resolve({
          errCode: 1,
          message: 'product not found',
        });
        return;
      }
      if (data) {
        const newData = {
          id: data[0].id,
          nameProduct: data[0].nameProduct,
          price: data[0].price,
          shortDescription: data[0].shortDescription,
          description: data[0].description,
          discount_percent: data[0].promotion.valuePromotion,
          imageProduct: data.map((item) => item.imageProduct),
        };
        resolve({
          data: newData,
          errCode: 0,
          message: 'get  product success',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const updateProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { id, idBrand, idPromotion, nameProduct, price, quantitySold, rate } = data;
    try {
      if (!id || !idBrand || !idPromotion || !nameProduct || !price || !quantitySold || !rate) {
        resolve({
          errCode: 1,
          message: `missing parameter  `,
        });
        return;
      }
      const product = await db.Product.findOne({
        where: { id: id },
        raw: true,
      });
      if (product) {
        await db.Product.update(
          {
            idBrand: idBrand,
            idPromotion: idPromotion,
            nameProduct: nameProduct,
            price: price,
            quantitySold: quantitySold,
            rate: rate,
          },
          {
            where: { id: id },
          }
        );
        resolve({
          errCode: 0,
          message: 'update product success',
        });
      } else {
        resolve({
          errCode: 2,
          message: 'product not found',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteProductService = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productId) {
        resolve({
          errCode: 1,
          message: 'missing id product',
        });
      }
      const product = await db.Product.findOne({
        where: { id: productId },
      });
      if (product) {
        await product.destroy();
        resolve({
          errCode: 0,
          errMessage: `The Product is deleted successfully`,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "The Product isn't exist",
        });
      }
    } catch (error) {
      console.log('error :', error);
      reject(error);
    }
  });
};

export const getFilterAllProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idBrand, modePrice, page, limit, newProduct, bestSelling, arrayPrice } = data;

    try {
      if (!page || !limit) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }

      const where = {};
      const order = [];
      let offset = (page - 1) * limit;

      if (idBrand) {
        where.idBrand = idBrand;
      }

      if (arrayPrice) {
        where[Sequelize.Op.or] = arrayPrice
          .split('-')
          .slice(1)
          .map((item) => ({
            price: {
              [Sequelize.Op.between]: item.split(','),
            },
          }));
      }

      if (modePrice === 'ASC') {
        order.push(['price', 'ASC']);
      }
      if (modePrice === 'DESC') {
        order.push(['price', 'DESC']);
      }
      if (bestSelling === 'DESC') {
        order.push(['quantitySold', 'DESC']);
      }

      if (newProduct === 'DESC') {
        order.push([['createdAt', 'DESC']]);
      }

      const count = await db.Product.count({});
      const data = await db.Product.findAll({
        offset,
        limit: parseInt(limit),
        where,
        order,

        attributes: {
          exclude: ['shortDescription', 'description', 'updatedAt'],
        },
        include: [
          {
            model: db.ImageProduct,
            as: 'imageProduct',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: db.Promotion,
            as: 'promotion',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
      });
      resolve({
        data,
        pagination: {
          page,
          limit,
          total: count,
        },
        errCode: 0,
        message: 'oke',
      });
    } catch (error) {
      console.log('check error', error);
      reject(error);
    }
  });
};
export const getProductNewService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
        include: [{ model: db.ImageProduct, as: 'imageProduct' }],
      });
      if (product) {
        resolve({
          data: product,
          errCode: 0,
          message: 'get product new successfully',
        });
        return;
      } else {
        resolve({
          errCode: 1,
          message: 'get product new failed',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const searchProductServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { limit, keyWord } = data;
    try {
      if (!keyWord) {
        resolve({
          data: [],
          errCode: 0,
          message: 'oke',
        });
        return;
      }
      const data = await db.Product.findAll({
        where: {
          nameProduct: {
            [Sequelize.Op.like]: `%${keyWord}%`,
          },
        },
        attributes: ['id', 'nameProduct', 'price'],
        limit: parseInt(limit) || 10,
      });
      resolve({
        data,
        errCode: 0,
        message: 'oke',
      });
    } catch (error) {
      console.log('check loi', error);
      reject(error);
    }
  });
};
