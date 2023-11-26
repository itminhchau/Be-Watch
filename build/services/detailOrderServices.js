"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDetailOrderServices = exports.createDetailOrdertServices = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.parse-float.js");
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const createDetailOrdertServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idOrder,
      idImageProduct,
      quantity,
      price,
      idCart
    } = data;
    try {
      if (!idOrder || !idImageProduct || !quantity || !price || !idCart) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const itemProduct = await _models.default.ImageProduct.findOne({
        where: {
          id: idImageProduct
        },
        attributes: ['id', 'idProduct', 'stock']
      });
      if (itemProduct.stock >= quantity) {
        await _models.default.DetailOrder.create({
          OrderId: parseInt(idOrder),
          ImageProductId: parseInt(idImageProduct),
          quantity: parseInt(quantity),
          unitPrice: parseFloat(price)
        });
        await _models.default.ImageProduct.update({
          stock: itemProduct.stock - quantity
        }, {
          where: {
            id: idImageProduct
          }
        });
        const product = await _models.default.Product.findOne({
          where: {
            id: itemProduct.idProduct
          }
        });
        if (product) {
          await _models.default.Product.update({
            quantitySold: product.quantitySold + parseInt(quantity)
          }, {
            where: {
              id: itemProduct.idProduct
            }
          });
        }
        await _models.default.Cart.destroy({
          where: {
            id: idCart
          }
        });

        // if (cart) {
        //   await cart.destroy();
        // }

        resolve({
          errCode: 0,
          message: 'create detail order success'
        });
      } else {
        resolve({
          data: imageProduct,
          errCode: 2,
          message: 'Insufficient quantity of product'
        });
      }
    } catch (error) {
      reject(error);
      console.log('check loi', error);
    }
  });
};
exports.createDetailOrdertServices = createDetailOrdertServices;
const getDetailOrderServices = idCustomer => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idCustomer) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      const detailOrders = await _models.default.Order.findAll({
        where: {
          idCustomer: idCustomer
        },
        raw: true,
        nest: true,
        include: [{
          model: _models.default.DetailOrder,
          attributes: ['id', 'OrderId', 'quantity', 'unitPrice'],
          include: [{
            model: _models.default.ImageProduct,
            attributes: {
              exclude: ['stock', 'createdAt', 'updatedAt', 'idColor']
            },
            include: [{
              model: _models.default.Product,
              as: 'imageProduct',
              attributes: {
                exclude: ['shortDescription', 'description', 'quantitySold', 'totalStock', 'rate', 'idBrand', 'createdAt', 'updatedAt', 'price']
              }
            }]
          }]
          // attributes: ['product_id', 'other_columns'], // Lấy các cột của bảng ImageProduct bạn muốn
        }
        // {
        //   model: db.Customer,
        //   as: 'orders',
        //   attributes: {
        //     exclude: ['password'],
        //   },
        // },
        ]
      });

      const uniqueDetailOrders = {}; // Sử dụng một đối tượng để lưu trữ các sản phẩm duy nhất

      detailOrders.forEach(detailOrder => {
        // Nếu sản phẩm chưa tồn tại trong đối tượng uniqueDetailOrders, thêm vào
        if (!uniqueDetailOrders[detailOrder.id]) {
          uniqueDetailOrders[detailOrder.id] = _objectSpread(_objectSpread({}, detailOrder), {}, {
            DetailOrders: [detailOrder.DetailOrders] // Gán danh sách hình ảnh cho sản phẩm
          });
        } else {
          // Nếu sản phẩm đã tồn tại, chỉ cần thêm hình ảnh vào danh sách

          uniqueDetailOrders[detailOrder.id].DetailOrders.push(detailOrder.DetailOrders);
        }
      });
      const formattedDetailOrders = Object.values(uniqueDetailOrders); // Chuyển đối tượng thành mảng
      resolve({
        data: formattedDetailOrders,
        errCode: 0,
        message: 'oke'
      });
    } catch (error) {
      console.log('check loi ', error);
      reject(error);
    }
  });
};
exports.getDetailOrderServices = getDetailOrderServices;