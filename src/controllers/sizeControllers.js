import { getAllSizeServices } from '../services';

export const getAllSize = async (req, res) => {
  try {
    const data = await getAllSizeServices();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      messCode: 'err from server',
    });
  }
};
