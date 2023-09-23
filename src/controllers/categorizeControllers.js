import { getAllCategorizeService } from '../services/categorizeServices';

export const getAllCategorize = async (req, res) => {
  try {
    const data = await getAllCategorizeService();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      messCode: 'err from server',
    });
  }
};
