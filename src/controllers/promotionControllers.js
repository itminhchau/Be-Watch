import { createPromotionService, updatePromotionService } from '../services';

export const handleCreatePromotion = async (req, res) => {
  try {
    const data = await createPromotionService(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleUpdatePromotion = async (req, res) => {
  try {
    const data = await updatePromotionService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
