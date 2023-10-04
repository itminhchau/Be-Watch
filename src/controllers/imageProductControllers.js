import {
  createImageProductServices,
  getImageProductOfIdProductAndIdColorServices,
  getImageProductService,
} from '../services';

export const createImageProduct = async (req, res) => {
  try {
    const data = await createImageProductServices(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};

export const handleGetImageProduct = async (req, res) => {
  try {
    const data = await getImageProductService(req.query.idProduct);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleGetImageProductOfIdProductAndIdColor = async (req, res) => {
  try {
    const data = await getImageProductOfIdProductAndIdColorServices(req.query.idProduct, req.query.idColor);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
