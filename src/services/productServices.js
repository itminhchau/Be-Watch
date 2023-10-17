import db from '../models';
import imageProduct from '../models/imageProduct';

export const createProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { nameProduct, price, shortDescription, description, quantitySold, totalStock, rate, idBrand } = data;

    try {
      if (
        !nameProduct ||
        !price ||
        !shortDescription ||
        !description ||
        !quantitySold ||
        !totalStock ||
        !rate ||
        !idBrand
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
        totalStock,
        rate,
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
export const getAllProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { page, limit } = data;
    try {
      if (!page || !limit) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
      }

      let offset = (page - 1) * limit;
      const data = await db.Product.findAll({
        offset,
        limit: parseInt(limit),
        include: [{ model: db.ImageProduct, as: 'imageProduct' }],
      });
      const count = await db.Product.count();
      resolve({
        pagination: {
          page,
          limit,
          total: count,
        },
        data,
        errCode: 0,
        message: 'get all product success',
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
        include: [{ model: db.ImageProduct, as: 'imageProduct' }],
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
    const { id, price, description, count } = data;
    try {
      if (!id || !price || !description || !count) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
      }
      const product = await db.Product.findOne({
        where: { id: id },
        raw: true,
      });
      if (product) {
        await db.Product.update(
          {
            price: price,
            description: description,
            count: count,
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
        raw: true,
      });

      if (product) {
        await db.Product.destroy({
          where: { id: productId },
        });
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
      reject(error);
    }
  });
};

export const getAllProductOfBrandService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: 'missing id brand',
        });
        return;
      }
      const data = await db.Product.findAll({
        where: { idBrand: id },
        attributes: {
          exclude: ['shortDescription', 'description', 'quantitySold'],
        },
        include: [{ model: db.ImageProduct, as: 'imageProduct' }],
      });
      resolve({
        data,
        errCode: 0,
        message: 'oke',
      });
    } catch (error) {
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
