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
operationRouter.get(
  "/affectation/:affectation",
  operationController.getOperationsByAffectation
);
operationRouter.post(
  "/affectation/:affectation/search",
  operationController.getOperationByDate
);
operationRouter.post("/", operationController.addOperation);
operationRouter.put(
  "/:id",
  [matiereExist, quantityChange],
  operationController.updateOperation
);
operationRouter.get("/export", operationController.exportOperation);
operationRouter.delete("/", operationController.deleteAllOperations);
operationRouter.delete("/:id", operationController.deleteOperationById);

module.exports = operationRouter;
