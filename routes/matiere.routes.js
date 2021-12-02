const express = require("express");
const matiereRouter = express.Router();
const matiereController = require("../controllers/matiere.controller");

matiereRouter.get("/", matiereController.getAllMatieres);
matiereRouter.get("/:id", matiereController.getMatiereById);
matiereRouter.post("/", matiereController.addMatiere);
matiereRouter.put("/:id", matiereController.updateMatiere);
matiereRouter.delete("/", matiereController.deleteAllMatieres);
matiereRouter.delete("/:id", matiereController.deleteMatiereById);

module.exports = matiereRouter;
