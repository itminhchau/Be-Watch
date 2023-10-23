import db from '../models';

export const createDetailOrdertServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idOrder, idImageProduct, quantity, price } = data;
    try {
      if (!idOrder || !idImageProduct || !quantity || !price) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const itemProduct = await db.ImageProduct.findOne({
        where: {
          id: idImageProduct,
        },
        attributes: ['id', 'idProduct', 'stock'],
      });

      if (itemProduct.stock >= quantity) {
        await db.DetailOrder.create({
          OrderId: parseInt(idOrder),
          ImageProductId: parseInt(idImageProduct),
          quantity: parseInt(quantity),
          unitPrice: parseFloat(price),
        });

        await db.ImageProduct.update(
          {
            stock: itemProduct.stock - quantity,
          },
          {
            where: {
              id: idImageProduct,
            },
          }
        );
        const product = await db.Product.findOne({
          where: {
            id: itemProduct.idProduct,
          },
        });
        await db.Product.update(
          {
            quantitySold: product.quantitySold + parseInt(quantity),
          },
          {
            where: {
              id: itemProduct.idProduct,
            },
          }
        );

        resolve({
          errCode: 0,
          message: 'create detail order success',
        });
      } else {
        resolve({
          data: imageProduct,
          errCode: 2,
          message: 'Insufficient quantity of product',
        });
      }
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};

export const getDetailOrderServices = (idCustomer) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idCustomer) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const detailOrder = await db.Order.findAll({
        where: {
          idCustomer: idCustomer,
        },
        include: [
          {
            model: db.DetailOrder,
            attributes: ['id', 'OrderId', 'ImageProductId', 'quantity', 'unitPrice', 'createdAt'],
            include: [
              {
                model: db.ImageProduct,
                include: [
                  {
                    model: db.Product,
                    as: 'imageProduct',
                    attributes: {
                      exclude: ['shortDescription', 'description', 'quantitySold', 'totalStock', 'rate', 'idBrand'],
                    },
                  },
                ],
              },
            ],
            // attributes: ['product_id', 'other_columns'], // Lấy các cột của bảng ImageProduct bạn muốn
          },
        ],
      });

      resolve({
        data: detailOrder,
        errCode: 0,
        message: 'oke',
      });
    } catch (error) {
      console.log('check loi ', error);
      reject(error);
    }
  });
};
