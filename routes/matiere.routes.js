const express = require("express");
const matiereRouter = express.Router();
const matiereController = require("../controllers/matiere.controller");

matiereRouter.get("/", matiereController.getAllMatieres);
matiereRouter.get("/:id", matiereController.getMatiereById);
matiereRouter.get(
  "/:affectation/all",
  matiereController.getMatieresByAffectation
);
matiereRouter.post("/", matiereController.addMatiere);
matiereRouter.put("/:id", matiereController.updateMatiere);
matiereRouter.patch("/:id/qte", matiereController.addMatiereQuantity);
matiereRouter.delete("/", matiereController.deleteAllMatieres);
matiereRouter.delete("/:id", matiereController.deleteMatiereById);

module.exports = matiereRouter;
