const express = require("express");
const matiereRouter = express.Router();
const matiereController = require("../controllers/matiere.controller");

/**
 * @openapi
 * /matiere:
 *      get:
 *          description: Display all center's raw materials
 *          tags:
 *            - raw materials
 *          responses:
 *              200:
 *                  description: Center's raw materials successfully displayed
 */
matiereRouter.get("/", matiereController.getAllMatieres);
/**
 * @openapi
 * /matiere/{id}:
 *      get:
 *          description: Display center's raw material by ID
 *          tags:
 *            - raw materials
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: raw material id
 *          responses:
 *              200:
 *                  description: Center's raw material successfully displayed
 */
matiereRouter.get("/:id", matiereController.getMatiereById);
/**
 * @openapi
 * /matiere/{affectation}/all:
 *      get:
 *          description: Display all center's raw materials by affectation
 *          tags:
 *            - raw materials
 *          parameters:
 *            - in: path
 *              name: affectation
 *              schema:
 *                type: String
 *              required: true
 *              description: raw material affectation
 *          responses:
 *              200:
 *                  description: Center's raw materials for this affectation successfully displayed
 */
matiereRouter.get(
  "/:affectation/all",
  matiereController.getMatieresByAffectation
);
/**
 * @openapi
 * /matiere:
 *      post:
 *          description: Record the center's raw material
 *          tags:
 *            - raw materials
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Center's raw material successfully recorded
 */
matiereRouter.post("/", matiereController.addMatiere);
/**
 * @openapi
 * /matiere/{id}:
 *      put:
 *          description: Update the center's raw material
 *          tags:
 *            - raw materials
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: raw material id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Center's raw material successfully updated
 */
matiereRouter.put("/:id", matiereController.updateMatiere);
/**
 * @openapi
 * /matiere/{id}/qte:
 *      patch:
 *          description: Update the center's raw material amount
 *          tags:
 *            - raw materials
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: raw material id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Center's raw material amount successfully updated
 */
matiereRouter.patch("/:id/qte", matiereController.addMatiereQuantity);
/**
 * @openapi
 * /matiere:
 *      delete:
 *          description: Delete all the center's raw material
 *          tags:
 *            - raw materials
 *          responses:
 *              200:
 *                  description: All center's raw material successfully deleted
 */
matiereRouter.delete("/", matiereController.deleteAllMatieres);
/**
 * @openapi
 * /matiere/{id}:
 *      delete:
 *          description: Delete the center's operation
 *          tags:
 *            - raw materials
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: raw material id
 *          responses:
 *              200:
 *                  description: Center's raw material successfully deleted
 */
matiereRouter.delete("/:id", matiereController.deleteMatiereById);

module.exports = matiereRouter;
