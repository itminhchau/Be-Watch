import { getAllBrandServices } from '../services';

export const handleGetAllBrands = async (req, res) => {
  try {
    const data = await getAllBrandServices();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
