const express = require("express");
const operationRouter = express.Router();
const operationController = require("../controllers/operation.controller");

operationRouter.get("/", operationController.getAllOperations);
operationRouter.get("/:id", operationController.getOperationById);
operationRouter.post("/", operationController.addOperation);
operationRouter.put("/:id", operationController.updateOperation);
operationRouter.delete("/", operationController.deleteAllOperations);
operationRouter.delete("/:id", operationController.deleteOperationById);

module.exports = operationRouter;
