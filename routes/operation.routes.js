const express = require("express");
const operationRouter = express.Router();
const operationController = require("../controllers/operation.controller");
const {
  matiereExist,
  typeOperation,
  quantityChange,
} = require("../middleware/stock/operations.middlewares");

/**
 * @openapi
 * /operation:
 *      get:
 *          description: Display all center's operations
 *          tags:
 *            - operations
 *          responses:
 *              200:
 *                  description: Center's operations successfully displayed
 */
operationRouter.get("/", operationController.getAllOperations);
/**
 * @openapi
 * /operation/states:
 *      get:
 *          description: Display raw material inventory status
 *          tags:
 *            - operations
 *          responses:
 *              200:
 *                  description: Raw material inventory successfully displayed
 */
operationRouter.get("/states", operationController.getMaterialState);
/**
 * @openapi
 * /operation/states:
 *      post:
 *          description: Display raw material inventory status by date
 *          tags:
 *            - operations
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Raw material inventory successfully displayed
 */
operationRouter.post("/states", operationController.getMaterialStateByDate);
/**
 * @openapi
 * /operation/{id}:
 *      get:
 *          description: Display center's operation by ID
 *          tags:
 *            - operations
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: operation id
 *          responses:
 *              200:
 *                  description: Center's operation successfully displayed
 */
operationRouter.get("/:id", operationController.getOperationById);
operationRouter.get(
  "/affectation/:affectation",
  operationController.getOperationsByAffectation
);
/**
 * @openapi
 * /operation:
 *      post:
 *          description: Record the center's operation
 *          tags:
 *            - operations
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Center's operation successfully recorded
 */
operationRouter.post(
  "/affectation/:affectation/search",
  operationController.getOperationByDate
);
operationRouter.post("/", operationController.addOperation);
/**
 * @openapi
 * /operation/{id}:
 *      put:
 *          description: Update the center's operation
 *          tags:
 *            - operations
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: operation id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Center's operation successfully updated
 */
operationRouter.put(
  "/:id",
  [quantityChange],
  operationController.updateOperation
);
operationRouter.delete("/", operationController.deleteAllOperations);
/**
 * @openapi
 * /operation/{id}:
 *      delete:
 *          description: Delete the center's operation
 *          tags:
 *            - operations
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: operation id
 *          responses:
 *              200:
 *                  description: Center's operation successfully deleted
 */
operationRouter.delete("/:id", operationController.deleteOperationById);

module.exports = operationRouter;
