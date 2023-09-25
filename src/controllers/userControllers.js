import {
  deleteSingleUserServices,
  getAllUserServices,
  loginUserServices,
  registerUserServices,
  getSingleUserServices,
  updateUserServices,
} from '../services';

export const handleRegisterUser = async (req, res) => {
  try {
    const data = await registerUserServices(req.body);
    // console.log('check data', data);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleLoginUser = async (req, res) => {
  try {
    const data = await loginUserServices(req.body.email, req.body.password);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleGetAllUser = async (req, res) => {
  try {
    const data = await getAllUserServices();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleGetSingleUser = async (req, res) => {
  try {
    const data = await getSingleUserServices(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleDeleteSingleUser = async (req, res) => {
  try {
    const data = await deleteSingleUserServices(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleUpdateUser = async (req, res) => {
  try {
    const data = await updateUserServices(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
