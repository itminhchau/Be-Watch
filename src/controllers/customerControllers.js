import {
  getAllCustomerServices,
  getSingleCustomerServices,
  loginCustomerServices,
  registerCustomerServices,
} from '../services';

export const handleRegisterCustomer = async (req, res) => {
  try {
    const data = await registerCustomerServices(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleLoginCustomer = async (req, res) => {
  try {
    const data = await loginCustomerServices(req.body.email, req.body.password);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleGetAllCustomer = async (req, res) => {
  try {
    const data = await getAllCustomerServices();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
export const handleGetSingleCustomer = async (req, res) => {
  try {
    const data = await getSingleCustomerServices(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
