import {
  createProductService,
  deleteProductService,
  getAllProductService,
  getProductOfCategorizeServices,
  getSingleProductService,
  updateProductService,
} from '../services';

export const handleGetProductOfCategorize = async (req, res) => {
  try {
    let data = await getProductOfCategorizeServices(req.query.id);
    // console.log('check data', data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};

export const handleCreateProduct = async (req, res) => {
  try {
    const data = await createProductService(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleGetAllProducts = async (req, res) => {
  try {
    const data = await getAllProductService();
    console.log(data, 'data');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleUpdateProduct = async (req, res) => {
  try {
    const data = await updateProductService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleDeleteSingleProduct = async (req, res) => {
  try {
    let deleteProduct = await deleteProductService(req.params.id);
    return res.status(200).json(deleteProduct);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleGetSingleProduct = async (req, res) => {
  try {
    const data = await getSingleProductService(req.body.id);
    console.log(data, 'data');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
