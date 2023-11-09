import { createQuestionServices, getQuestionServices } from '../services';

export const handleCreateQuestion = async (req, res) => {
  try {
    const data = await createQuestionServices(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
export const handleGetQuestion = async (req, res) => {
  try {
    const data = await getQuestionServices(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
