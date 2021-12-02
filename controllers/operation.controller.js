const { matiere_premiere, operation_matiere } = require("../models");
const { isEmpty } = require("lodash");

const getAllOperations = async (req, res, next) => {};
const getOperationById = async (req, res, next) => {};
const addOperation = async (req, res, next) => {};
const updateOperation = async (req, res, next) => {};
const deleteAllOperations = async (req, res, next) => {};
const deleteOperationById = async (req, res, next) => {};

module.exports = {
  getAllOperations,
  getOperationById,
  addOperation,
  updateOperation,
  deleteAllOperations,
  deleteOperationById,
};
