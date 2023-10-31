import { createContactServices } from '../services';

export const handleCreateContact = async (req, res) => {
  try {
    const data = await createContactServices(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
