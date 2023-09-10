import productServices, { getProductOfCategorizeServices } from '../services/productServices';

// const productController = {
//   handleGetProductOfCategorize: async (req, res) => {
//     try {
//       // let data = await productServices.GetProductOfCategorize(req.query.id);
//       return res.status(200).json({ data: 'oke' });
//     } catch (error) {
//       return res.status(500).json({
//         errCode: -1,
//         errMessage: 'err form server ...',
//       });
//     }
//   },
// };

export const handleGetProductOfCategorize = async (req, res) => {
  try {
    let data = await getProductOfCategorizeServices(req.query.id);
    console.log('check data', data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...',
    });
  }
};
