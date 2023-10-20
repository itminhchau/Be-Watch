import {
  getAllCustomerServices,
  getSingleCustomerServices,
  loginCustomerServices,
  refreshTokenCustomerService,
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
export const handleRefreshTokenCustomer = async (req, res) => {
  try {
    const token = req.headers.token.split(' ')[1];

    if (token) {
      const data = await refreshTokenCustomerService(token);
      return res.status(200).json(data);
    } else {
      return res.status(200).json({
        errCode: -1,
        message: 'RefreshToken is not valid',
      });
    }
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
