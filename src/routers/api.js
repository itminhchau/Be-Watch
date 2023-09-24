import express from 'express';
import {
  handleCreateProduct,
  handleGetProductOfCategorize,
  getAllCategorize,
  getAllSize,
  handleGetAllProducts,
  handleUpdateProduct,
  handleDeleteSingleProduct,
} from '../controllers';

let router = express.Router();

const initAPIRouter = (app) => {
  // api get product in category
  router.get('/api/v1/get/product-of-categorize', handleGetProductOfCategorize);
  // api create product
  router.post('/api/v1/create/product', handleCreateProduct);
  // get all categorize
  router.get('/api/v1/get/categorize', getAllCategorize);
  // get all size
  router.get('/api/v1/get/size', getAllSize);
  //get all products;
  router.get('/api/v1/get/products', handleGetAllProducts);
  //update single product
  router.put('/api/v1/update/product', handleUpdateProduct);
  //delete single product
  router.delete('/api/v1/delete/product/:id', handleDeleteSingleProduct);

  app.use('/', router);
};

export default initAPIRouter;
