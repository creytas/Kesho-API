const express = require("express");
const { addPatient } = require("../../controllers/patient.controller");
const { body, validationResult } = require("express-validator");

const patientValidatorAdd = express();

const validationData = [
  body("atcd_mas").notEmpty().withMessage("Cannot be empty"),
  body("nbre_chute").notEmpty().withMessage("Cannot be empty"),
  body("cause_dpm").notEmpty().withMessage("Cannot be empty"),
  body("terme_grossesse").notEmpty().withMessage("Cannot be empty"),
  body("sejour_neonat").notEmpty().withMessage("Cannot be empty"),
  body("eig").notEmpty().withMessage("Cannot be empty"),
  body("lieu_accouchement").notEmpty().withMessage("Cannot be empty"),
  body("asphyxie_perinatal").notEmpty().withMessage("Cannot be empty"),
  body("dpm").notEmpty().withMessage("Cannot be empty"),
  body("produit_plante")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("rang_fratrie").notEmpty().withMessage("Cannot be empty"),
  body("taille_fratrie").notEmpty().withMessage("Cannot be empty"),
  body("atcd_rougeole_fratrie").notEmpty().withMessage("Cannot be empty"),
  body("vaccination_rougeole").notEmpty().withMessage("Cannot be empty"),
  body("terrain_vih").notEmpty().withMessage("Cannot be empty"),
  body("tbc")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("atcd_du_tbc_dans_fratrie")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("hospitalisation_recente")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("diagnostique_hospitalisation")
    .notEmpty()
    .withMessage("Cannot be empty"),
  body("duree_prise_atb")
  .matches(/\w{1,}/)
  .withMessage("la taille inférieur à 1"),
  body("peri_cranien").notEmpty().withMessage("Cannot be empty"),
  body("peri_brachial").notEmpty().withMessage("Cannot be empty"),
  body("poids")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\d{1,4}/)
    .withMessage("pas de lettres"),
  body("taille")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\d{1,4}/)
    .withMessage("pas de lettres"),
  body("type_malnutrition")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/[A-Za-z]{3,4}/)
    .withMessage("la taille inférieur à 3"),
  body("type_statut_marital")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/[A-Za-z]{4,}/)
    .withMessage("la taille inférieur à 4"),
  body("statut_marital")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/[A-Za-z]{4,}/)
    .withMessage("la taille inférieur à 4"),
  body("nom_patient")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/[A-Za-z]{2,}/)
    .withMessage("la taille inférieur à 2"),
  body("postnom_patient")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/[A-Za-z]{2,}/)
    .withMessage("la taille inférieur à 4 et pas de chiffres"),
  body("prenom_patient")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/[A-Za-z]{2,}/)
    .withMessage("la taille inférieur à 4 et pas de chiffres"),
  body("sexe_patient")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/[M|F]{1,1}$/)
    .withMessage("type de sexe non connu"),
  body("provenance_patient").notEmpty().withMessage("Cannot be empty"),
  body("poids_naissance")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\d{1,3}/)
    .withMessage("pas de lettres"),
  body("transferer_unt")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("declarer_gueri")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("diversification_aliment").notEmpty().withMessage("Cannot be empty"),
  body("telephone")
    .notEmpty()
    .withMessage("Cannot be empty")
    .withMessage("numéro non valide"),
  body("adresse_patient").notEmpty().withMessage("Cannot be empty"),
  body("vivre_deux_parents")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("mere_enceinte")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("mere_en_vie")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("pere_en_vie")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("profession_mere").notEmpty().withMessage("Cannot be empty"),
  body("profession_chef_menage").notEmpty().withMessage("Cannot be empty"),
  body("age_mere")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isDate()
    .withMessage("date not validated"),
  body("scolarite_mere").notEmpty().withMessage("Cannot be empty"),
  body("contraception_mere").isBoolean().withMessage("c'est un champ boolean"),
  body("type_contraception")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\D/)
    .withMessage("pas de chiffres"),
  body("contraception_naturelle")
    .matches(/[A-Za-z]{4,}/)
    .withMessage("la taille inférieur à 4"),
  body("contraception_moderne")
    .matches(/[A-Za-z]{4,}/)
    .withMessage("la taille inférieur à 4"),
  body("niveau_socioeconomique")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/[A-Za-z]{3,}/)
    .withMessage("la taille inférieur à 4"),
  body("statut_marital")
    .matches(/[A-Za-z]{4,}/)
    .withMessage("la taille inférieur à 4"),
  body("nbre_femme_pere")
    .matches(/\d{1,3}$/)
    .withMessage("pas de lettres"),
  body("tribu").notEmpty().withMessage("Cannot be empty"),
  body("religion").notEmpty().withMessage("Cannot be empty"),
  body("posseder_radio_tele")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("nbre_repas").notEmpty().withMessage("Cannot be empty"),
  body("consommation_poisson")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("atb").notEmpty().withMessage("Cannot be empty"),
  body("liste_atb").notEmpty().withMessage("Cannot be empty"),
  body("mas_fratrie").notEmpty().withMessage("Cannot be empty"),
  body("tbc_chez").notEmpty().withMessage("Cannot be empty"),
  body("tbc_gueris").notEmpty().withMessage("Cannot be empty"),
  body("duree_traitement_tbc").notEmpty().withMessage("Cannot be empty"),
  body("tbc_declarer_finie").notEmpty().withMessage("Cannot be empty"),
  body("nom_tuteur")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\w{2,}/)
    .withMessage("la taille inférieur à 2"),
  body("taille_menage")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\d{1,3}/)
    .withMessage("pas de lettres"),
  body("tbc_parents")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("calendrier_vaccinal").notEmpty().withMessage("Cannot be empty"),
  body("vaccin_non_recu")
    .matches(/[A-Za-z]{3,}/)
    .withMessage("la taille inférieur à 4"),
  body("duree_produit_plante")
    .matches(/\w{2,}/)
    .withMessage("la taille supérieur à 1"),
  body("date_naissance_patient")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isDate()
    .withMessage("date not validated"),
  body("date_naissance_tuteur")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isDate()
    .withMessage("date not validated"),
  body("allaitement_6mois")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("age_fin_allaitement").notEmpty().withMessage("Cannot be empty"),
  body("traitement_nutri").notEmpty().withMessage("Cannot be empty"),
  body("cocktail_atb").isBoolean().withMessage("c'est un champ boolean"),
  body("transferer_unt")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
];
patientValidatorAdd.use(validationData, async (req, res, next) => {
  // Cause malnutrition
  const {
    atcd_mas,
    nbre_chute,
    mas_fratie,
    terme_grossesse,
    sejour_neonat,
    eig,
    lieu_accouchement,
    asphyxie_perinatal,
    cause_dpm,
    dpm,
    caliendrier_vaccinal,
    rang_fratrie,
    taille_fratrie,
    atcd_rougeole_fratrie,
    vaccination_rougeole,
    terrain_vih,
    tbc,
    atcd_du_tbc_dans_fratrie,
    hospitalisation_recente,
    diagnostique_hospitalisation,
    cocktail_atb,
    duree_prise_atb,
    mas_fratrie,
  } = req.body;

  // Table Parametres Anthropometriques
  const { peri_cranien, peri_brachail, poids, taille, type_malnutrition } =
    req.body;

  // Table Patient
  const {
    nom_patient,
    postnom_patient,
    prenom_patient,
    sexe_patient,
    age_patient,
    provenance_patient,
    mode_arrive,
    poids_naissance,
    fin_allaitement,
    diversification_aliment,
    telephone,
    id_famille,
  } = req.body;

  // add table famille

  const {
    taille_famille,
    vivre_deux_parents,
    mere_enceinte,
    mere_en_vie,
    pere_en_vie,
    profession_mere,
    profession_chef_menage,
    age_mere,
    scolarite_mere,
    contraception_mere,
    contraception_moderne,
    niveau_socioeconomique,
    statut_marital,
    nbre_femme_pere,
    tribu,
    religion,
    posseder_radio_tele,
    nbre_repas,
    consommation_poisson,
    atb,
    liste_atb,
    tbc_chez_parents,
    tbc_chez,
    tbc_gueris,
    duree_traitement_tbc,
    tbc_declarer_finie,
    nom_tuteur,
  } = req.body;
  const errors = validationResult(req);
  // erreur pour voir si le champs est vide
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

module.exports = patientValidatorAdd;
