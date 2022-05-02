const express = require("express");
const { addPatient } = require("../../controllers/patient.controller");
const { body, validationResult } = require("express-validator");

const patientValidatorAdd = express();

const validationData = [
  body("ration_seche"),
  body("atcd_mas"),
  body("nbre_chute"),
  body("cause_dpm"),
  body("terme_grossesse").notEmpty().withMessage("Cannot be empty"),
  body("sejour_neonat"),
  body("eig"),
  body("lieu_accouchement"),
  body("asphyxie_perinatal"),
  body("dpm"),
  body("produit_plante")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("rang_fratrie"),
  body("taille_fratrie"),
  body("atcd_rougeole_fratrie"),
  body("vaccination_rougeole"),
  body("terrain_vih"),
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
  body("peri_cranien"),
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
    .matches(/[A-Za-z]{1,4}/)
    .withMessage("la taille inférieur à 1"),
  body("type_statut_marital")
    .matches(/[A-Za-z]{4,}/)
    .withMessage("la taille inférieur à 4"),
  body("statut_marital")
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
  body("prenom_patient"),
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
  body("transferer_unt").isBoolean().withMessage("c'est un champ boolean"),
  body("declarer_gueri").isBoolean().withMessage("c'est un champ boolean"),
  body("diversification_aliment").notEmpty().withMessage("Cannot be empty"),
  body("telephone"),
  body("adresse_patient"),
  body("vivre_deux_parents")
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
    .withMessage("Cannot be empty"),
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
  body("atb"),
  body("liste_atb"),
  body("mas_fratrie"),
  body("tbc_chez"),
  body("tbc_gueris"),
  body("duree_traitement_tbc"),
  body("tbc_declarer_finie"),
  body("taille_menage")
    .matches(/\d{1,3}/)
    .withMessage("pas de lettres"),
  body("tbc_parents").isBoolean().withMessage("c'est un champ boolean"),
  body("calendrier_vaccinal").notEmpty().withMessage("Cannot be empty"),
  body("vaccin_non_recu")
    .matches(/[A-Za-z]{3,}/)
    .withMessage("la taille inférieur à 4"),
  body("duree_produit_plante"),
  body("date_naissance_patient")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isDate()
    .withMessage("date not validated"),
  body("age_tuteur"),
  body("allaitement_6mois")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("c'est un champ boolean"),
  body("age_fin_allaitement"),
  body("traitement_nutri"),
  body("cocktail_atb").isBoolean().withMessage("c'est un champ boolean"),
  body("transferer_unt").isBoolean().withMessage("c'est un champ boolean"),
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
  const {
    peri_cranien,
    peri_brachail,
    poids,
    taille,
    type_malnutrition,
    ration_seche,
    type_oedeme,
    date_admission_patient,
    date_guerison_patient,
    first_picture,
    last_picture,
    commentaires
  } = req.body;

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
    etat_mere,
    mere_en_vie,
    pere_en_vie,
    profession_mere,
    profession_chef_menage,
    age_mere,
    age_tuteur,
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
    tuteur,
  } = req.body;
  const errors = validationResult(req);
  // erreur pour voir si le champs est vide
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

module.exports = patientValidatorAdd;
