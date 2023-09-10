import express from 'express';
import { handleGetProductOfCategorize } from '../controllers/productControllers';

let router = express.Router();

const initAPIRouter = (app) => {
  // api login user
  router.get('/api/v1/get/product-of-categorize', handleGetProductOfCategorize);

  //get doctor infor
  // router.get('/api/v1/get/doctor-infor',doctorApiController.handleGetDoctorInfor)

  app.use('/', router);
};

export default initAPIRouter;
