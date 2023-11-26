"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductService = exports.searchProductServices = exports.getSingleProductService = exports.getProductNewService = exports.getFilterAllProductService = exports.deleteProductService = exports.createProductService = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.parse-int.js");
var _models = _interopRequireWildcard(require("../models"));
var _imageProduct = _interopRequireDefault(require("../models/imageProduct"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const createProductService = data => {
  return new Promise(async (resolve, reject) => {
    const {
      nameProduct,
      price,
      shortDescription,
      description,
      quantitySold,
      rate,
      idBrand,
      idPromotion
    } = data;
    try {
      if (!nameProduct || !price || !shortDescription || !description || !quantitySold || !rate || !idBrand || !idPromotion) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
        });
        return;
      }
      await _models.default.Product.create({
        nameProduct,
        price,
        shortDescription,
        description,
        quantitySold,
        rate,
        idPromotion,
        idBrand
      });
      resolve({
        errCode: 0,
        message: 'create product success'
      });
    } catch (error) {
      reject(error);
    }
  });
};
exports.createProductService = createProductService;
const getSingleProductService = async id => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: 'missing parameter id'
        });
        return;
      }
      const data = await _models.default.Product.findAll({
        where: {
          id: id
        },
        include: [{
          model: _models.default.ImageProduct,
          as: 'imageProduct'
        }, {
          model: _models.default.Promotion,
          as: 'promotion'
        }],
        raw: true,
        nest: true
      });
      if (!data) {
        resolve({
          errCode: 1,
          message: 'product not found'
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
          imageProduct: data.map(item => item.imageProduct)
        };
        resolve({
          data: newData,
          errCode: 0,
          message: 'get  product success'
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.getSingleProductService = getSingleProductService;
const updateProductService = data => {
  return new Promise(async (resolve, reject) => {
    const {
      id,
      idBrand,
      idPromotion,
      nameProduct,
      price,
      quantitySold,
      rate
    } = data;
    try {
      if (!id || !idBrand || !idPromotion || !nameProduct || !price || !quantitySold || !rate) {
        resolve({
          errCode: 1,
          message: "missing parameter  "
        });
        return;
      }
      const product = await _models.default.Product.findOne({
        where: {
          id: id
        },
        raw: true
      });
      if (product) {
        await _models.default.Product.update({
          idBrand: idBrand,
          idPromotion: idPromotion,
          nameProduct: nameProduct,
          price: price,
          quantitySold: quantitySold,
          rate: rate
        }, {
          where: {
            id: id
          }
        });
        resolve({
          errCode: 0,
          message: 'update product success'
        });
      } else {
        resolve({
          errCode: 2,
          message: 'product not found'
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.updateProductService = updateProductService;
const deleteProductService = productId => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productId) {
        resolve({
          errCode: 1,
          message: 'missing id product'
        });
      }
      const product = await _models.default.Product.findOne({
        where: {
          id: productId
        }
      });
      if (product) {
        await product.destroy();
        resolve({
          errCode: 0,
          errMessage: "The Product is deleted successfully"
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "The Product isn't exist"
        });
      }
    } catch (error) {
      console.log('error :', error);
      reject(error);
    }
  });
};
exports.deleteProductService = deleteProductService;
const getFilterAllProductService = data => {
  return new Promise(async (resolve, reject) => {
    const {
      idBrand,
      modePrice,
      page,
      limit,
      newProduct,
      bestSelling,
      arrayPrice
    } = data;
    try {
      if (!page || !limit) {
        resolve({
          errCode: 1,
          message: 'missing parameter'
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
        where[_models.Sequelize.Op.or] = arrayPrice.split('-').slice(1).map(item => ({
          price: {
            [_models.Sequelize.Op.between]: item.split(',')
          }
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
      const count = await _models.default.Product.count({});
      const products = await _models.default.Product.findAll({
        offset,
        limit: parseInt(limit),
        where,
        order,
        attributes: {
          exclude: ['shortDescription', 'description', 'updatedAt']
        },
        include: [{
          model: _models.default.ImageProduct,
          as: 'imageProduct',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }, {
          model: _models.default.Promotion,
          as: 'promotion',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }],
        raw: true,
        nest: true
      });
      const uniqueProducts = {}; // Sử dụng một đối tượng để lưu trữ các sản phẩm duy nhất

      products.forEach(product => {
        // Nếu sản phẩm chưa tồn tại trong đối tượng uniqueProducts, thêm vào
        if (!uniqueProducts[product.id]) {
          uniqueProducts[product.id] = _objectSpread(_objectSpread({}, product), {}, {
            imageProduct: [product.imageProduct] // Gán danh sách hình ảnh cho sản phẩm
          });
        } else {
          // Nếu sản phẩm đã tồn tại, chỉ cần thêm hình ảnh vào danh sách

          uniqueProducts[product.id].imageProduct.push(product.imageProduct);
        }
      });
      const formattedProducts = Object.values(uniqueProducts); // Chuyển đối tượng thành mảng

      resolve({
        data: formattedProducts,
        pagination: {
          page,
          limit,
          total: count
        },
        errCode: 0,
        message: 'oke'
      });
    } catch (error) {
      console.log('check error product', error);
      reject(error);
    }
  });
};
exports.getFilterAllProductService = getFilterAllProductService;
const getProductNewService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await _models.default.Product.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
        include: [{
          model: _models.default.ImageProduct,
          as: 'imageProduct'
        }]
      });
      if (product) {
        resolve({
          data: product,
          errCode: 0,
          message: 'get product new successfully'
        });
        return;
      } else {
        resolve({
          errCode: 1,
          message: 'get product new failed'
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
exports.getProductNewService = getProductNewService;
const searchProductServices = data => {
  return new Promise(async (resolve, reject) => {
    const {
      limit,
      keyWord
    } = data;
    try {
      if (!keyWord) {
        resolve({
          data: [],
          errCode: 0,
          message: 'oke'
        });
        return;
      }
      const data = await _models.default.Product.findAll({
        where: {
          nameProduct: {
            [_models.Sequelize.Op.like]: "%".concat(keyWord, "%")
          }
        },
        attributes: ['id', 'nameProduct', 'price'],
        limit: parseInt(limit) || 10
      });
      resolve({
        data,
        errCode: 0,
        message: 'oke'
      });
    } catch (error) {
      console.log('check loi', error);
      reject(error);
    }
  });
};
exports.searchProductServices = searchProductServices;