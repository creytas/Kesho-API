const express = require("express");
const { param, body, validationResult } = require("express-validator");

const updatePatientMiddleware = express();
const validationData =  [
  param("id_patient").isEmpty().withMessage("paramètre manquant"),
  // .matches(/\d/)
  // .withMessage("paramètre non valide"),
  body("atcd_mas").notEmpty().withMessage("Cannot be empty"),
  body("nbre_chute").notEmpty().withMessage("Cannot be empty"),
  body("cause_dpm").notEmpty().withMessage("Cannot be empty"),
  body("terme_grossesse").notEmpty().withMessage("Cannot be empty"),
  body("sejour_neonat").notEmpty().withMessage("Cannot be empty"),
  body("eig").notEmpty().withMessage("Cannot be empty"),
  body("lieu_accouchement").notEmpty().withMessage("Cannot be empty"),
  body("asphyxie_perinatal").notEmpty().withMessage("Cannot be empty"),
  body("dpm").notEmpty().withMessage("Cannot be empty"),
  body("produit_plante").notEmpty().withMessage("Cannot be empty"),
  body("rang_fratrie").notEmpty().withMessage("Cannot be empty"),
  body("taille_fratrie").notEmpty().withMessage("Cannot be empty"),
  body("atcd_rougeole_fratrie").notEmpty().withMessage("Cannot be empty"),
  body("vaccination_rougeole").notEmpty().withMessage("Cannot be empty"),
  body("terrain_vih").notEmpty().withMessage("Cannot be empty"),
  body("tbc").notEmpty().withMessage("Cannot be empty"),
  body("atcd_du_tbc_dans_fratrie").notEmpty().withMessage("Cannot be empty"),
  body("hospitalisation_recente").notEmpty().withMessage("Cannot be empty"),
  body("diagnostique_hospitalisation").notEmpty().withMessage("Cannot be empty"),
  body("duree_prise_atb").notEmpty().withMessage("Cannot be empty"),
  body("peri_cranien").notEmpty().withMessage("Cannot be empty"),
  body("peri_brachial").notEmpty().withMessage("Cannot be empty"),
  body("poids").notEmpty().withMessage("Cannot be empty"),
  body("taille").notEmpty().withMessage("Cannot be empty"),
  body("type_malnutrition").notEmpty().withMessage("Cannot be empty"),
  body("type_statut_marital").notEmpty().withMessage("Cannot be empty"),
  body("statut_marital").notEmpty().withMessage("Cannot be empty"),
  body("nom_patient").notEmpty().withMessage("Cannot be empty"),
  body("postnom_patient").notEmpty().withMessage("Cannot be empty"),
  body("prenom_patient").notEmpty().withMessage("Cannot be empty"),
  body("sexe_patient").notEmpty().withMessage("Cannot be empty"),
  body("age_patient").notEmpty().withMessage("Cannot be empty"),
  body("provenance_patient").notEmpty().withMessage("Cannot be empty"),
  body("poids_naissance").notEmpty().withMessage("Cannot be empty"),
  body("fin_allaitement").notEmpty().withMessage("Cannot be empty"),
  body("mois_fin_allaitement").notEmpty().withMessage("Cannot be empty"),
  body("diversification_aliment").notEmpty().withMessage("Cannot be empty"),
  body("telephone").notEmpty().withMessage("Cannot be empty"),
  body("image_patient").notEmpty().withMessage("Cannot be empty"),
  body("contraception_naturelle").notEmpty().withMessage("Cannot be empty"),
  body("adresse_patient").notEmpty().withMessage("Cannot be empty"),
  body("type_contraception").notEmpty().withMessage("Cannot be empty").matches(/\D/).withMessage("pas de chiffres"),
  body("vivre_deux_parents").notEmpty().withMessage("Cannot be empty"),
  body("mere_enceinte").notEmpty().withMessage("Cannot be empty"),
  body("mere_en_vie").notEmpty().withMessage("Cannot be empty"),
  body("pere_en_vie").notEmpty().withMessage("Cannot be empty"),
  body("profession_mere").notEmpty().withMessage("Cannot be empty"),
  body("profession_chef_menage").notEmpty().withMessage("Cannot be empty"),
  body("age_mere").notEmpty().withMessage("Cannot be empty"),
  body("scolarite_mere").notEmpty().withMessage("Cannot be empty"),
  body("contraception_mere").notEmpty().withMessage("Cannot be empty"),
  body("contraception_moderne").notEmpty().withMessage("Cannot be empty"),
  body("niveau_socioeconomique").notEmpty().withMessage("Cannot be empty"),
  body("statut_marital").notEmpty().withMessage("Cannot be empty"),
  body("nbre_femme_pere").notEmpty().withMessage("Cannot be empty"),
  body("tribu").notEmpty().withMessage("Cannot be empty"),
  body("religion").notEmpty().withMessage("Cannot be empty"),
  body("posseder_radio_tele").notEmpty().withMessage("Cannot be empty"),
  body("nbre_repas").notEmpty().withMessage("Cannot be empty"),
  body("consommation_poisson").notEmpty().withMessage("Cannot be empty"),
  body("atb").notEmpty().withMessage("Cannot be empty"),
  body("liste_atb").notEmpty().withMessage("Cannot be empty"),
  body("mas_fratrie").notEmpty().withMessage("Cannot be empty"),
  body("tbc_chez").notEmpty().withMessage("Cannot be empty"),
  body("tbc_gueris").notEmpty().withMessage("Cannot be empty"),
  body("duree_traitement_tbc").notEmpty().withMessage("Cannot be empty"),
  body("tbc_declarer_finie").notEmpty().withMessage("Cannot be empty"),
  body("nom_tuteur").notEmpty().withMessage("Cannot be empty"),
  body("taille_menage").notEmpty().withMessage("Cannot be empty"),
  body("tbc_parents").notEmpty().withMessage("Cannot be empty"),
  body("calendrier_vaccinal").notEmpty().withMessage("Cannot be empty"),
  body("vaccin_non_recu").notEmpty().withMessage("Cannot be empty"),
  body("duree_produit_plante").notEmpty().withMessage("Cannot be empty"),
  body("date_naissance_patient").notEmpty().withMessage("Cannot be empty"),
  body("date_naissance_tuteur").notEmpty().withMessage("Cannot be empty"),
  body("allaitement_6mois").notEmpty().withMessage("Cannot be empty"),
  body("age_fin_allaitement").notEmpty().withMessage("Cannot be empty"),
  body("traitement_nutri").notEmpty().withMessage("Cannot be empty"),
]

updatePatientMiddleware.use(
  validationData,
 
  async (req, res, next) => {
    
    const { id_patient } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    res.id_patient = id_patient;
    next();
  }
);

module.exports = updatePatientMiddleware;