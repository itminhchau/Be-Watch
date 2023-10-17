import { createCartServices, getAllCartServices } from '../services';

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
export const handleGetAllCart = async (req, res) => {
  try {
    const data = await getAllCartServices(req.query.idCustomer);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
