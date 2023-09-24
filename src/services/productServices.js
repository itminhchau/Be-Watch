import db from '../models';
export const getProductOfCategorizeServices = (id) => {
  return new Promise(async (resolve, reject) => {
    // console.log('id', id);

    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: 'missing id category',
        });
      }
      let products = await db.Product.findAll({
        where: { idCategorize: id },
        include: [{ model: db.Categorize, as: 'categorize', attributes: ['nameCategorize', 'description'] }],
        raw: true,
        nest: true,
      });
      console.log('da chay');
      resolve({
        errCode: 0,
        data: products,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const createProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { nameProduct, price, description, image, size, gender, count, idCategorize } = data;
    // console.log('data', data);
    try {
      if (!nameProduct || !price || !description || !image || !size || !gender || !count || !idCategorize) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      await db.Product.create({
        nameProduct,
        price,
        description,
        image,
        size,
        gender,
        count,
        idCategorize,
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
export const getAllProductsService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { limit, page } = data;
    try {
      if (!limit || !page) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }

      const offset = (page - 1) * limit;
      const products = await db.Product.findAll({ offset, limit: parseInt(limit), raw: true, nest: true });
      const total = await db.Product.count();

      if (products) {
        resolve({
          data: products,
          pagination: {
            limit,
            page,
            total,
          },
          message: 'success',
          errCode: 0,
        });
      } else {
        reject({
          errCode: 1,
          message: 'failed get all products',
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
    console.log('id', productId);
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

      console.log('product :', product);
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
