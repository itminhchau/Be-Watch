import { createDetailOrdertServices, getDetailOrderServices } from '../services';

export const handleCreateDetailOrder = async (req, res) => {
  try {
    const data = await createDetailOrdertServices(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
export const handleGetDetailOrder = async (req, res) => {
  try {
    const data = await getDetailOrderServices(req.query.idCustomer);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
