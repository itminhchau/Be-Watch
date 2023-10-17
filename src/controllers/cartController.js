import {
  createCartServices,
  deleteCartServices,
  getAllCartServices,
  getUpdateQuantityCartServices,
  updateQuantityCartServices,
} from '../services';

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

export const handleDeleteCart = async (req, res) => {
  try {
    const data = await deleteCartServices(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
export const handleUpdateQuantityCart = async (req, res) => {
  try {
    const { id, mode } = req.body;
    const data = await updateQuantityCartServices(id, mode);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
