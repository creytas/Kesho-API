const express = require("express");
const produitRouter = express.Router();
const produitController = require("../controllers/produit.controller");

produitRouter.get("/", produitController.getAllProduits);
produitRouter.get("/:id", produitController.getProduitById);
produitRouter.post("/", produitController.addProduit);
produitRouter.put("/:id", produitController.updateProduit);
produitRouter.delete("/", produitController.deleteAllProduits);
produitRouter.delete("/:id", produitController.deleteProduitById);

module.exports=produitRouter;
