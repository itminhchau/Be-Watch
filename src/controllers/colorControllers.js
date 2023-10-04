import { createColorServices, getAllColorServices, getColorImageProductServices } from '../services';

export const handleCreateColor = async (req, res) => {
  try {
    const data = await createColorServices(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleGetAllColors = async (req, res) => {
  try {
    const data = await getAllColorServices();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
