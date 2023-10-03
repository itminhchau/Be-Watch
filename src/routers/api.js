import express from 'express';
import {
  createImageProduct,
  handleCreateColor,
  handleCreateProduct,
  handleDeleteSingleProduct,
  handleDeleteSingleUser,
  handleGetAllBrands,
  handleGetAllProducts,
  handleGetAllUser,
  handleGetSingleProduct,
  handleGetSingleUser,
  handleLoginUser,
  handleRegisterUser,
  handleUpdateProduct,
  handleUpdateUser,
} from '../controllers';

let router = express.Router();

const initAPIRouter = (app) => {
  // api create product
  router.post('/api/v1/create/product', handleCreateProduct);
  //get all products;
  router.get('/api/v1/get/products', handleGetAllProducts);
  //get single product
  router.get('/api/v1/get-single/product', handleGetSingleProduct);
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
  app.use('/', router);
};

export default initAPIRouter;
