import { createCartServices } from '../services';

export const handleCreateCart = async (req, res) => {
  const value = req.body;
  try {
    const data = await createCartServices(value);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
