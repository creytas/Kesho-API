const express = require("express");
const operationRouter = express.Router();
const operationController = require("../controllers/operation.controller");
const {
  matiereExist,
  typeOperation,
  quantityChange,
} = require("../middleware/stock/operations.middlewares");

operationRouter.get("/", operationController.getAllOperations);
operationRouter.get("/:id", operationController.getOperationById);
operationRouter.post(
  "/",
  [matiereExist, typeOperation],
  operationController.addOperation
);
operationRouter.put(
  "/:id",
  [matiereExist, quantityChange],
  operationController.updateOperation
);
operationRouter.delete("/", operationController.deleteAllOperations);
operationRouter.delete("/:id", operationController.deleteOperationById);

module.exports = operationRouter;
