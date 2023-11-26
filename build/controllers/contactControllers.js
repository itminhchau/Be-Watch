"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCreateContact = void 0;
require("core-js/modules/es.promise.js");
var _services = require("../services");
const handleCreateContact = async (req, res) => {
  try {
    const data = await (0, _services.createContactServices)(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: 'err form server ...'
    });
  }
};
exports.handleCreateContact = handleCreateContact;