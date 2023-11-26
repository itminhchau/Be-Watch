import db from '../models';

export const createDetailOrdertServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idOrder, idImageProduct, quantity, price, idCart } = data;
    try {
      if (!idOrder || !idImageProduct || !quantity || !price || !idCart) {
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
        if (product) {
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
        }

        await db.Cart.destroy({
          where: { id: idCart },
        });

        // if (cart) {
        //   await cart.destroy();
        // }

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
      const detailOrders = await db.Order.findAll({
        where: {
          idCustomer: idCustomer,
        },
        raw: true,
        nest: true,
        include: [
          {
            model: db.DetailOrder,
            attributes: ['id', 'OrderId', 'quantity', 'unitPrice'],
            include: [
              {
                model: db.ImageProduct,
                attributes: {
                  exclude: ['stock', 'createdAt', 'updatedAt', 'idColor'],
                },
                include: [
                  {
                    model: db.Product,
                    as: 'imageProduct',
                    attributes: {
                      exclude: [
                        'shortDescription',
                        'description',
                        'quantitySold',
                        'totalStock',
                        'rate',
                        'idBrand',
                        'createdAt',
                        'updatedAt',
                        'price',
                      ],
                    },
                  },
                ],
              },
            ],
            // attributes: ['product_id', 'other_columns'], // Lấy các cột của bảng ImageProduct bạn muốn
          },
          // {
          //   model: db.Customer,
          //   as: 'orders',
          //   attributes: {
          //     exclude: ['password'],
          //   },
          // },
        ],
      });

      const uniqueDetailOrders = {}; // Sử dụng một đối tượng để lưu trữ các sản phẩm duy nhất

      detailOrders.forEach((detailOrder) => {
        // Nếu sản phẩm chưa tồn tại trong đối tượng uniqueDetailOrders, thêm vào
        if (!uniqueDetailOrders[detailOrder.id]) {
          uniqueDetailOrders[detailOrder.id] = {
            ...detailOrder,
            DetailOrders: [detailOrder.DetailOrders], // Gán danh sách hình ảnh cho sản phẩm
          };
        } else {
          // Nếu sản phẩm đã tồn tại, chỉ cần thêm hình ảnh vào danh sách

          uniqueDetailOrders[detailOrder.id].DetailOrders.push(detailOrder.DetailOrders);
        }
      });

      const formattedDetailOrders = Object.values(uniqueDetailOrders); // Chuyển đối tượng thành mảng
      resolve({
        data: formattedDetailOrders,
        errCode: 0,
        message: 'oke',
      });
    } catch (error) {
      console.log('check loi ', error);
      reject(error);
    }
  });
};
