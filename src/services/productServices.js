import db from '../models';
export const getProductOfCategorizeServices = (id) => {
  return new Promise(async (resolve, reject) => {
    console.log('id', id);

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
