import express from 'express';
import {
  createImageProduct,
  handleCreateCart,
  handleCreateColor,
  handleCreateDetailOrder,
  handleCreateOrder,
  handleCreateProduct,
  handleDeleteCart,
  handleDeleteSingleProduct,
  handleDeleteSingleUser,
  handleGetAllBrands,
  handleGetAllCart,
  handleGetAllColors,
  handleGetAllCustomer,
  handleGetAllUser,
  handleGetDetailOrder,
  handleGetFilterAllProduct,
  handleGetImageProduct,
  handleGetImageProductOfIdProductAndIdColor,
  handleGetSingleCustomer,
  handleGetSingleProduct,
  handleGetSingleUser,
  handleLoginCustomer,
  handleLoginUser,
  handleRegisterCustomer,
  handleRegisterUser,
  handleSearchProduct,
  handleUpdateProduct,
  handleUpdateQuantityCart,
  handleUpdateUser,
  handleGetProductNew,
  handleRefreshTokenCustomer,
  handleUpdateCustomer,
} from '../controllers';
import middlewareController from '../controllers/middlewareController';

let router = express.Router();

const initAPIRouter = (app) => {
  // api create product
  router.post('/api/v1/create/product', handleCreateProduct);
  // //get all products;
  // router.get('/api/v1/get/products', handleGetAllProducts);
  //get single product
  router.get('/api/v1/get-single/product/:id', handleGetSingleProduct);
  //update single product
  router.put('/api/v1/update/product', handleUpdateProduct);
  //delete single product
  router.delete('/api/v1/delete/product/:id', handleDeleteSingleProduct);
  //regisger user
  router.post('/api/v1/create/user', handleRegisterUser);
  //login user
  router.post('/api/v1/login/user', handleLoginUser);
  //get all user
  router.get('/api/v1/getall/user', handleGetAllUser);
  //get single user
  router.get('/api/v1/get-single/user', handleGetSingleUser);
  //delete single user
  router.delete('/api/v1/delete/user/:id', handleDeleteSingleUser);
  //update single user
  router.put('/api/v1/update/user', handleUpdateUser);
  // create image product
  router.post('/api/v1/create/image-product', createImageProduct);
  //get all brands
  router.get('/api/v1/getall/brand', handleGetAllBrands);
  //create color
  router.post('/api/v1/create/color', handleCreateColor);
  // get all color
  router.get('/api/v1/get/colors', handleGetAllColors);
  // get image of product
  router.get('/api/v1/get/image-product', handleGetImageProduct);
  // get image of product and color
  router.get('/api/v1/get/image-product-color', handleGetImageProductOfIdProductAndIdColor);
  //get product of brand
  router.get('/api/v1/get/filter/all/product', handleGetFilterAllProduct);
  //customer
  //register customer
  router.post('/api/v1/create/customer', handleRegisterCustomer);
  //login customer
  router.post('/api/v1/login/customer', handleLoginCustomer);
  //get all customer
  router.get('/api/v1/getall/customer', handleGetAllCustomer);
  //get single customer
  router.get('/api/v1/get-single/customer', handleGetSingleCustomer);
  //update single customer
  router.put('/api/v1/update/customer', handleUpdateCustomer);
  // add  to card
  router.post('/api/v1/create/cart', middlewareController.verifyToken, handleCreateCart);

  //get all Cart
  router.get('/api/v1/getall/cart', middlewareController.verifyToken, handleGetAllCart);
  //delete cart
  router.delete('/api/v1/delete/cart/:id', handleDeleteCart);
  //router update quantity cart
  router.put('/api/v1/update/quantity/cart', handleUpdateQuantityCart);
  //router search product
  router.get('/api/v1/search/product', handleSearchProduct);
  //router create order
  router.post('/api/v1/create/order', handleCreateOrder);
  //router create detail order
  router.post('/api/v1/create/detail/order', handleCreateDetailOrder);
  //router get detail order
  router.get('/api/v1/get/detail/order', handleGetDetailOrder);

  //get new product
  router.get('/api/v1/get-new/product', handleGetProductNew);
  //refresherToken customer
  router.post('/api/v1/refresh-token/customer', handleRefreshTokenCustomer);
  app.use('/', router);
};

export default initAPIRouter;
