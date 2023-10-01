import { createImageProductServices } from '../services';

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
