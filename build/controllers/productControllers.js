"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUpdateProduct = exports.handleSearchProduct = exports.handleGetSingleProduct = exports.handleGetProductNew = exports.handleGetFilterAllProduct = exports.handleDeleteSingleProduct = exports.handleCreateProduct = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreateProduct = async (req, res) => {
  try {
    const data = await (0, _services.createProductService)(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
// export const handleGetAllProducts = async (req, res) => {
//   try {
//     const data = await getAllProductService(req.query);
//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({
//       errCode: -1,
//       errMessage: 'err form server ...',
//     });
//   }
// };
exports.handleCreateProduct = handleCreateProduct;
const handleUpdateProduct = async (req, res) => {
  try {
    const data = await (0, _services.updateProductService)(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleUpdateProduct = handleUpdateProduct;
const handleDeleteSingleProduct = async (req, res) => {
  try {
    let deleteProduct = await (0, _services.deleteProductService)(req.params.id);
    return res.status(200).json(deleteProduct);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleDeleteSingleProduct = handleDeleteSingleProduct;
const handleGetSingleProduct = async (req, res) => {
  try {
    const data = await (0, _services.getSingleProductService)(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetSingleProduct = handleGetSingleProduct;
const handleGetFilterAllProduct = async (req, res) => {
  try {
    const data = await (0, _services.getFilterAllProductService)(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetFilterAllProduct = handleGetFilterAllProduct;
const handleGetProductNew = async (req, res) => {
  try {
    const data = await (0, _services.getProductNewService)();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleGetProductNew = handleGetProductNew;
const handleSearchProduct = async (req, res) => {
  try {
    const data = await (0, _services.searchProductServices)(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleSearchProduct = handleSearchProduct;