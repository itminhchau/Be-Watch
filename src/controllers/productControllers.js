import {
  createProductService,
  deleteProductService,
  getAllProductOfBrandService,
  getAllProductService,
  getFilterAllProductService,
  getProductNewService,
  getSingleProductService,
  searchProductServices,
  updateProductService,
} from '../services';

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
// export const handleGetAllProducts = async (req, res) => {
//   try {
//     const data = await getAllProductService(req.query);
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({
//       errCode: -1,
//       errMessage: 'err form server ...',
//     });
//   }
// };
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
    const data = await getSingleProductService(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};

export const handleGetFilterAllProduct = async (req, res) => {
  try {
    const data = await getFilterAllProductService(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};

export const handleGetProductNew = async (req, res) => {
  try {
    const data = await getProductNewService();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleSearchProduct = async (req, res) => {
  try {
    const data = await searchProductServices(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
