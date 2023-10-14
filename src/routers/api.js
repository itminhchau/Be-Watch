import express from 'express';
import {
  createImageProduct,
  handleCreateColor,
  handleCreateProduct,
  handleDeleteSingleProduct,
  handleDeleteSingleUser,
  handleGetAllBrands,
  handleGetAllColor,
  handleGetAllProducts,
  handleGetAllUser,
  handleGetSingleProduct,
  handleGetSingleUser,
  handleLoginUser,
  handleRegisterUser,
  handleUpdateProduct,
  handleUpdateUser,
  handleGetAllColors,
  handleGetImageProduct,
  handleGetColorImageProduct,
  handleGetImageProductOfIdProductAndIdColor,
  handleGetAllProductOfBrand,
  handleRegisterCustomer,
  handleLoginCustomer,
  handleGetAllCustomer,
  handleGetSingleCustomer,
  handleCreateCart,
  handleGetProductNew,
} from '../controllers';

let router = express.Router();

const initAPIRouter = (app) => {
  // api create product
  router.post('/api/v1/create/product', handleCreateProduct);
  //get all products;
  router.get('/api/v1/get/products', handleGetAllProducts);
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
  router.get('/api/v1/get/product-of-brand', handleGetAllProductOfBrand);
  //customer
  //register customer
  router.post('/api/v1/create/customer', handleRegisterCustomer);
  //login customer
  router.post('/api/v1/login/customer', handleLoginCustomer);
  //get all customer
  router.get('/api/v1/getall/customer', handleGetAllCustomer);
  //get single customer
  router.get('/api/v1/get-single/customer', handleGetSingleCustomer);
  // add  to card
  router.post('/api/v1/create/cart', handleCreateCart);
  //get new product
  router.get('/api/v1/get-new/product', handleGetProductNew);

  app.use('/', router);
};

export default initAPIRouter;
