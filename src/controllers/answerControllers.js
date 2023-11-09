import { createAnswerServices } from '../services';

export const handleCreateAnswer = async (req, res) => {
  try {
    const data = await createAnswerServices(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
