"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../controllers");
var _middlewareController = _interopRequireDefault(require("../controllers/middlewareController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let router = _express.default.Router();
const initAPIRouter = app => {
  // api create product
  router.post('/api/v1/create/product', _controllers.handleCreateProduct);
  // //get all products;
  // router.get('/api/v1/get/products', handleGetAllProducts);
  //get single product
  router.get('/api/v1/get-single/product/:id', _controllers.handleGetSingleProduct);
  //update single product
  router.put('/api/v1/update/product', _controllers.handleUpdateProduct);
  //delete single product
  router.delete('/api/v1/delete/product/:id', _controllers.handleDeleteSingleProduct);
  //regisger user
  router.post('/api/v1/create/user', _controllers.handleRegisterUser);
  //login user
  router.post('/api/v1/login/user', _controllers.handleLoginUser);
  //get all user
  router.get('/api/v1/getall/user', _controllers.handleGetAllUser);
  //get single user
  router.get('/api/v1/get-single/user', _controllers.handleGetSingleUser);
  //delete single user
  router.delete('/api/v1/delete/user/:id', _controllers.handleDeleteSingleUser);
  //update single user
  router.put('/api/v1/update/user', _controllers.handleUpdateUser);
  // create image product
  router.post('/api/v1/create/image-product', _controllers.createImageProduct);
  //get all brands
  router.get('/api/v1/getall/brand', _controllers.handleGetAllBrands);
  //create color
  router.post('/api/v1/create/color', _controllers.handleCreateColor);
  // get all color
  router.get('/api/v1/get/colors', _controllers.handleGetAllColors);
  // get image of product
  router.get('/api/v1/get/image-product', _controllers.handleGetImageProduct);
  // get image of product and color
  router.get('/api/v1/get/image-product-color', _controllers.handleGetImageProductOfIdProductAndIdColor);
  //get product of brand
  router.get('/api/v1/get/filter/all/product', _controllers.handleGetFilterAllProduct);
  //customer
  //register customer
  router.post('/api/v1/create/customer', _controllers.handleRegisterCustomer);
  //login customer
  router.post('/api/v1/login/customer', _controllers.handleLoginCustomer);
  //get all customer
  router.get('/api/v1/getall/customer', _controllers.handleGetAllCustomer);
  //get single customer
  router.get('/api/v1/get-single/customer', _controllers.handleGetSingleCustomer);
  //update single customer
  router.put('/api/v1/update/customer', _controllers.handleUpdateCustomer);
  // add  to card
  router.post('/api/v1/create/cart', _middlewareController.default.verifyToken, _controllers.handleCreateCart);

  //get all Cart
  router.get('/api/v1/getall/cart', _middlewareController.default.verifyToken, _controllers.handleGetAllCart);
  //delete cart
  router.delete('/api/v1/delete/cart/:id', _controllers.handleDeleteCart);
  //router update quantity cart
  router.put('/api/v1/update/quantity/cart', _controllers.handleUpdateQuantityCart);
  //router search product
  router.get('/api/v1/search/product', _controllers.handleSearchProduct);
  //router create order
  router.post('/api/v1/create/order', _controllers.handleCreateOrder);
  //router create detail order
  router.post('/api/v1/create/order/detail', _controllers.handleCreateDetailOrder);
  //router get detail order
  router.get('/api/v1/get/detail/order', _controllers.handleGetDetailOrder);

  //get new product
  router.get('/api/v1/get-new/product', _controllers.handleGetProductNew);
  //refresherToken customer
  router.post('/api/v1/refresh-token/customer', _controllers.handleRefreshTokenCustomer);
  //create promotin
  router.post('/api/v1/create/promotion', _controllers.handleCreatePromotion);
  //router update promotion
  router.put('/api/v1/update/promotion', _controllers.handleUpdatePromotion);
  //get all promotion
  router.get('/api/v1/getall/promotion', _controllers.handleGetAllPromotions);
  //create contact sendEmail
  router.post('/api/v1/create/contact', _controllers.handleCreateContact);
  //BiggestProductPromotion
  router.get('/api/v1/product/promotion-biggest', _controllers.handleGetBiggestProductPromotion);
  //create review
  router.post('/api/v1/create/review', _controllers.handleCreateReview);
  //router get review product
  router.get('/api/v1/get-review-product/review', _controllers.handleGetReviewProduct);
  //router get avg star
  router.get('/api/v1/get-avg-star/review', _controllers.handleGetAvgStar);
  //router create question
  router.post('/api/v1/create/question', _controllers.handleCreateQuestion);
  //router create answer
  router.post('/api/v1/create/answer', _controllers.handleCreateAnswer);
  //router get question
  router.get('/api/v1/get-question', _controllers.handleGetQuestion);
  app.use('/', router);
};
var _default = exports.default = initAPIRouter;