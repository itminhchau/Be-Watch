import { createReviewServices, getAvgStar, getReviewProduct } from '../services';

export const handleCreateReview = async (req, res) => {
  try {
    const data = await createReviewServices(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleGetReviewProduct = async (req, res) => {
  try {
    const data = await getReviewProduct(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
export const handleGetAvgStar = async (req, res) => {
  try {
    const data = await getAvgStar(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'error from server',
    });
  }
};
