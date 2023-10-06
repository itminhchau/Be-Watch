import db from '../models';

export const createProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { nameProduct, price, shortDescription, description, quantitySold, rate, idBrand } = data;

    try {
      if (!nameProduct || !price || !shortDescription || !description || !quantitySold || !rate || !idBrand) {
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
export const getAllProductService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Product.findAll();
      resolve({
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
      const data = await db.Product.findOne({
        where: { id: id },
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
      resolve({
        data,
        errCode: 0,
        message: 'get  product success',
      });
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
