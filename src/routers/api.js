import express from 'express';
import { handleCreateProduct, handleGetProductOfCategorize, getAllCategorize } from '../controllers';

let router = express.Router();

const initAPIRouter = (app) => {
  // api get product in category
  router.get('/api/v1/get/product-of-categorize', handleGetProductOfCategorize);
  // api create product
  router.post('/api/v1/create/product', handleCreateProduct);
  // get all categorize
  router.get('/api/v1/get/categorize', getAllCategorize);

  app.use('/', router);
};

export default initAPIRouter;
