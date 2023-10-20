import db from '../models';

export const createCartServices = (data) => {
  return new Promise(async (resolve, reject) => {
    const { idImageProduct, idCustomer, quantity, status } = data;
    try {
      if (!idImageProduct || !idCustomer || !quantity || !status) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }
      const cartItem = await db.Cart.findOne({
        where: {
          ImageProductId: idImageProduct,
          CustomerId: idCustomer,
        },
      });
      if (cartItem) {
        const newQuantity = cartItem.quantity + parseInt(quantity);
        await db.Cart.update(
          {
            quantity: newQuantity,
          },
          {
            where: {
              ImageProductId: idImageProduct,
              CustomerId: idCustomer,
            },
          }
        );
        resolve({
          errCode: 0,
          message: 'update cart success',
        });
      } else {
        await db.Cart.create({
          ImageProductId: parseInt(idImageProduct),
          CustomerId: parseInt(idCustomer),
          quantity: parseInt(quantity),
          status,
        });

        resolve({
          errCode: 0,
          message: 'create cart success',
        });
      }
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};

export const getAllCartServices = (idCustomer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Cart.findAll({
        where: { CustomerId: idCustomer },
        attributes: ['id', 'ImageProductId', 'CustomerId', 'quantity', 'status'],
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
            // attributes: ['product_id', 'other_columns'], // Lấy các cột của bảng ImageProduct bạn muốn
          },
          // {
          //   model: db.Customer,
          //   // attributes: ['customer_id', 'other_columns'], // Lấy các cột của bảng Customer bạn muốn
          //   attributes: {
          //     exclude: ['password'],
          //   },
          // },
        ],
      });

      resolve({
        errCode: 0,
        message: 'oke',
        data,
      });
    } catch (error) {
      console.log('check error', error);
      reject(error);
    }
  });
};

export const deleteCartServices = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      }

      const cart = await db.Cart.findOne({
        where: { id: id },
        raw: true,
      });

      if (cart) {
        await db.Cart.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          errMessage: `The cart is deleted successfully`,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "The cart isn't exist",
        });
      }
    } catch (error) {
      console.log('check error', error);
      reject(error);
    }
  });
};

export const updateQuantityCartServices = (id, mode) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !mode) {
        resolve({
          errCode: 1,
          message: 'missing parameter',
        });
        return;
      } else {
        const ItemCart = await db.Cart.findOne({
          where: { id: id },
        });
        if (ItemCart) {
          switch (mode) {
            case 'sum':
              await db.Cart.update(
                {
                  quantity: ItemCart.quantity + 1,
                },
                {
                  where: { id: id },
                }
              );
              resolve({
                errCode: 0,
                message: 'update sum cart success',
              });
              break;
            case 'sub':
              await db.Cart.update(
                {
                  quantity: ItemCart.quantity <= 1 ? 1 : ItemCart.quantity - 1,
                },
                {
                  where: { id: id },
                }
              );
              resolve({
                errCode: 0,
                message: 'update sub cart success',
              });
              break;

            default:
              break;
          }
        } else {
          resolve({
            errCode: 2,
            message: 'item not exits',
          });
        }
      }
    } catch (error) {
      console.log('check error', error);
      reject(error);
    }
  });
};
