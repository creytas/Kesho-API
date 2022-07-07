const {
  patient,
  cause_malnutrition,
  famille,
  anthropometrique,
  consulter_par,
  user,
  sequelize,
} = require("../models");
const { cloudinary } = require("../utils/cloudinary");
const { QueryTypes } = require("sequelize");
const { compareSync } = require("bcrypt");

const addPatient = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const {
        first_picture,
        last_picture,
        date_admission_patient,
        date_guerison_patient,
        commentaires,
        ration_seche,
        type_oedeme,
        atcd_mas,
        nbre_chute,
        age_tuteur,
        terme_grossesse,
        sejour_neonat,
        eig,
        lieu_accouchement,
        asphyxie_perinatal,
        dpm,
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
        peri_cranien,
        peri_brachial,
        poids,
        taille,
        hemoglobine,
        hematocrite,
        type_malnutrition,
        type_contraception,
        contraception_naturelle,
        nom_patient,
        postnom_patient,
        prenom_patient,
        sexe_patient,
        age_patient,
        provenance_patient,
        mode_arrive,
        poids_naissance,
        diversification_aliment,
        telephone,
        taille_famille,
        vivre_deux_parents,
        etat_mere,
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
        tribu,
        religion,
        posseder_radio_tele,
        nbre_repas,
        consommation_poisson,
        atb,
        liste_atb,
        tbc_parents,
        tbc_chez,
        tbc_gueris,
        duree_traitement_tbc,
        tbc_declarer_finie,
        type_statut_marital,
        tuteur,
        nbre_femme_pere,
        taille_menage,
        adresse_patient,
        date_naissance_patient,
        mas_fratrie,
        cause_dpm,
        calendrier_vaccinal,
        vaccin_non_recu,
        produit_plante,
        duree_produit_plante,
        transferer_unt,
        declarer_gueri,
        image_patient,
        traitement_nutri,
        constitution_aliment,
        age_fin_allaitement,
        allaitement_6mois,
      } = req.body;
      const userId = req.user.id;
      console.log(first_picture);
      let pictureEmpty;
      if (first_picture === "") {
        pictureEmpty = true;
      } else {
        pictureEmpty = false;
        firstPictureLink = await cloudinary.uploader.upload(first_picture, {
          upload_preset: "dev_setups",
        });
      }
      // const pictureToStore =
      //   first_picture === "" ? first_picture : firstPictureLink.secure_url;
      //Famille refactor insert
      const newFamille = await famille.create({
        taille_famille,
        vivre_deux_parents,
        etat_mere,
        mere_en_vie,
        pere_en_vie,
        profession_mere,
        profession_chef_menage,
        age_mere,
        scolarite_mere,
        type_contraception,
        contraception_mere,
        contraception_naturelle,
        contraception_moderne,
        niveau_socioeconomique,
        type_statut_marital,
        statut_marital,
        nbre_femme_pere,
        tribu,
        religion,
        posseder_radio_tele,
        nbre_repas,
        consommation_poisson,
        atb,
        liste_atb,
        tbc_parents,
        tbc_chez,
        tbc_gueris,
        duree_traitement_tbc,
        tbc_declarer_finie,
        tuteur,
        taille_menage,
        age_tuteur,
      });
      const id_famille = await newFamille.id;

      //Patient
      const newPatient = await patient.create({
        nom_patient,
        postnom_patient,
        prenom_patient,
        sexe_patient,
        age_patient,
        provenance_patient,
        image_patient,
        adresse_patient,
        mode_arrive,
        poids_naissance,
        telephone,
        familleId: id_famille,
        date_naissance_patient,
        transferer_unt,
        declarer_gueri,
      });
      const patientId = newPatient.id;

      await anthropometrique.create({
        peri_cranien,
        peri_brachial,
        poids,
        taille,
        hematocrite,
        hemoglobine,
        type_malnutrition,
        patientId,
        ration_seche,
        type_oedeme,
        first_picture:
          pictureEmpty === true ? first_picture : firstPictureLink.secure_url,
        last_picture,
        date_admission_patient,
        date_guerison_patient,
        commentaires,
        createdAt: date_admission_patient,
      });
      await consulter_par.create({
        patientId,
        userId,
      });

      //Cause_malnutrition
      await cause_malnutrition.create({
        atcd_mas,
        nbre_chute,
        terme_grossesse,
        sejour_neonat,
        eig,
        lieu_accouchement,
        asphyxie_perinatal,
        dpm,
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
        cause_dpm,
        calendrier_vaccinal,
        vaccin_non_recu,
        produit_plante,
        duree_produit_plante,
        patientId,
        traitement_nutri,
        diversification_aliment,
        constitution_aliment,
        age_fin_allaitement,
        allaitement_6mois,
      });
      return res
        .status(200)
        .json({ message: "Enregistrement effectuer avec succès" });
    });
  } catch (error) {
    res.status(400).json({ error: ` ${error}  et ${req.body.first_picture}` });
  }
};
const getPatient = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { patientId } = res;
      const Patient = await patient.findOne({
        where: { id_patient: patientId },
        attributes: [
          "id",
          "id_patient",
          "nom_patient",
          "postnom_patient",
          "prenom_patient",
          "sexe_patient",
          "date_naissance_patient",
          "poids_naissance",
          "adresse_patient",
          "provenance_patient",
          "transferer_unt",
          "mode_arrive",
          "telephone",
          "familleId",
          "declarer_sorti",
          "modalite_sortie",
        ],
      });
      if (!Patient) {
        res.status(400).json({
          error: `Le patient ayant l'identifiant ${patientId} est introuvable`,
        });
      } else {
        const id_famillePatient = Patient.familleId;
        const id_patient = Patient.id;
        const Anthropometrique = await anthropometrique.findAll({
          where: { patientId: id_patient },
          order: [["id", "DESC"]],
          limit: 10,
          attributes: [
            "id",
            "peri_cranien",
            "peri_brachial",
            "poids",
            "taille",
            "type_malnutrition",
            "first_picture",
            "last_picture",
            "date_admission_patient",
            "date_guerison_patient",
            "commentaires",
            "ration_seche",
            "type_oedeme",
            "createdAt",
          ],
        });
        const Famille = await famille.findOne({
          where: { id: id_famillePatient },
          attributes: [
            "id",
            "tuteur",
            "taille_menage",
            "id_famille",
            "vivre_deux_parents",
            "etat_mere",
            "pere_en_vie",
            "mere_en_vie",
            "age_mere",
            "profession_mere",
            "profession_chef_menage",
            "scolarite_mere",
            "contraception_mere",
            "type_contraception",
            "contraception_naturelle",
            "contraception_moderne",
            "niveau_socioeconomique",
            "statut_marital",
            "type_statut_marital",
            "nbre_femme_pere",
            "tribu",
            "religion",
            "posseder_radio_tele",
            "nbre_repas",
            "consommation_poisson",
            "tbc_parents",
          ],
        });
        const CauseMalnutrition = await cause_malnutrition.findOne({
          where: { patientId: id_patient },
          attributes: [
            "id",
            "id_causemalnutrition",
            "atcd_mas",
            "nbre_chute",
            "eig",
            "terme_grossesse",
            "sejour_neonat",
            "lieu_accouchement",
            "asphyxie_perinatal",
            "dpm",
            "cause_dpm",
            "calendrier_vaccinal",
            "rang_fratrie",
            "taille_fratrie",
            "atcd_rougeole_fratrie",
            "vaccination_rougeole",
            "terrain_vih",
            "allaitement_6mois",
            "age_fin_allaitement",
            "tbc",
            "atcd_du_tbc_dans_fratrie",
            "hospitalisation_recente",
            "diagnostique_hospitalisation",
            "diversification_aliment",
            "constitution_aliment",
          ],
        });
        const consultant = await consulter_par.findOne({
          where: { patientId: id_patient },
          order: [["id", "DESC"]],
          limit: 1,
        });
        const PatientAge = await sequelize.query(
          `
            select datediff(now(), date_naissance_patient) as ageEnMois,   datediff(now(), date_naissance_patient)/365 as ageEnAnnee
              from patients
              where id=${id_patient};
          `,
          { type: QueryTypes.SELECT }
        );
        const date_consultation = await consultant.createdAt;
        const { userId } = await consultant;
        const name_consultant = await user.findOne({
          where: { id: userId },
          attributes: ["nom_user", "postnom_user", "prenom_user"],
          paranoid: false,
        });
        res.status(200).json({
          Patient,
          Anthropometrique,
          Famille,
          CauseMalnutrition,
          name_consultant,
          date_consultation,
          PatientAge,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};
const updatePatient = async (req, res) => {
  if (req.user.is_admin === true) {
    const id_patient = res.id_patient;
    const patientFind = await patient.findOne({ where: { id_patient } });
    try {
      const result = await sequelize.transaction(async (t) => {
        const {
          atcd_mas,
          nbre_chute,
          age_tuteur,
          terme_grossesse,
          sejour_neonat,
          eig,
          lieu_accouchement,
          asphyxie_perinatal,
          dpm,
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
          nom_patient,
          postnom_patient,
          prenom_patient,
          sexe_patient,
          age_patient,
          provenance_patient,
          mode_arrive,
          poids_naissance,
          diversification_aliment,
          telephone,
          taille_famille,
          vivre_deux_parents,
          mere_enceinte,
          mere_en_vie,
          pere_en_vie,
          profession_mere,
          profession_chef_menage,
          age_mere,
          scolarite_mere,
          type_contraception,
          contraception_naturelle,
          contraception_mere,
          contraception_moderne,
          niveau_socioeconomique,
          statut_marital,
          tribu,
          religion,
          posseder_radio_tele,
          nbre_repas,
          consommation_poisson,
          atb,
          liste_atb,
          tbc_parents,
          tbc_chez,
          tbc_gueris,
          duree_traitement_tbc,
          tbc_declarer_finie,
          type_statut_marital,
          nom_tuteur,
          nbre_femme_pere,
          taille_menage,
          adresse_patient,
          date_naissance_patient,
          mas_fratrie,
          cause_dpm,
          calendrier_vaccinal,
        } = req.body;
        if (patientFind) {
          const patientId = await patientFind.id;
          const familleId = await patientFind.familleId;
          const cause_malnutritionId = await cause_malnutrition.findOne({
            where: {
              patientId,
            },
            attributes: ["id"],
          });

          await patient.update(
            {
              nom_patient,
              postnom_patient,
              prenom_patient,
              sexe_patient,
              age_patient,
              provenance_patient,
              mode_arrive,
              poids_naissance,
              adresse_patient,
              date_naissance_patient,
              diversification_aliment,
              telephone,
            },
            {
              where: {
                id_patient,
              },
            }
          );
          await famille.update(
            {
              type_statut_marital,
              tbc_parents,
              taille_menage,
              taille_famille,
              vivre_deux_parents,
              mere_enceinte,
              mere_en_vie,
              pere_en_vie,
              profession_mere,
              profession_chef_menage,
              age_mere,
              scolarite_mere,
              type_contraception,
              contraception_naturelle,
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
              tbc_chez,
              tbc_gueris,
              duree_traitement_tbc,
              tbc_declarer_finie,
              nom_tuteur,
              age_tuteur,
            },
            {
              where: {
                id: familleId,
              },
            }
          );

          await cause_malnutrition.update(
            {
              atcd_mas,
              nbre_chute,
              mas_fratrie,
              terme_grossesse,
              sejour_neonat,
              eig,
              lieu_accouchement,
              asphyxie_perinatal,
              cause_dpm,
              dpm,
              calendrier_vaccinal,
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
            },
            { where: { id: cause_malnutritionId.id } }
          );

          return res.status(200).json({
            message: `Mise à jour effectuée avec succès`,
          });
        } else {
          return res.status(400).json({
            message: `Le personnel ayant l'identifiant ${id} est introuvable`,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: `Impossible de mettre à jour ce patient ${patientFind.nom_user} ${patientFind.postnom_user} ${error}`,
      });
    }
  } else {
    return res
      .status(400)
      .send("Access denied. You aren't an admin, you can't update a user.");
  }
};
const getAllPatient = async (req, res) => {
  let { limit_start, limit_end } = res;
  const reg = /^\d+$/;
  const testRegexEnd = reg.test(limit_end);
  const testRegexStart = reg.test(limit_start);
  if (
    (!testRegexStart && !testRegexEnd) ||
    (limit_start == 0 && limit_end == 1)
  ) {
    limit_end = 30;
    limit_start = 0;
  } else {
    limit_end = parseInt(limit_end);
    limit_start = parseInt(limit_start);
  }
  const nombre_patient = await patient.count();
  // if(limit_start > nombre_patient ){
  //   limit_start = nombre_patient;
  // }
  try {
    const result = await sequelize.transaction(async (t) => {
      const Patients = await sequelize.query(
        `select Pa.id, Pa.id_patient, nom_patient, postnom_patient, date(date_naissance_patient) as date_naissance, prenom_patient, Pa.sexe_patient, Anthr.type_malnutrition, date(Date_Consultation) as date_Consultation, Pa.transferer_unt, nom_user as nom_consultant, postnom_user as postnom_consultant  from
        patients as Pa
        inner join ( 
          SELECT id, patientId, type_malnutrition, createdAt as Date_Consultation
          FROM anthropometriques
          WHERE createdAt IN (
            SELECT MAX(createdAt)
            FROM anthropometriques
            GROUP BY patientId
          )
        ) as Anthr
        on Anthr.patientId = Pa.id
        inner join (
        SELECT id, patientId, userId
        FROM consulter_pars
        WHERE createdAt IN (
            SELECT MAX(createdAt)
            FROM consulter_pars
            GROUP BY patientId
        )
        ) as Cons
        on Anthr.patientId = Cons.patientId 
        inner join users
        on Cons.userId = users.id
        ORDER BY Pa.id DESC
        LIMIT :limitParamStart,:limitParamEnd
        `,
        {
          replacements: {
            limitParamStart: limit_start,
            limitParamEnd: limit_end,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      //LIMIT :limitParamStart,:limitParamEnd
      res.status(200).json({ nombre_patient, Patients });
    });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
const updatePatientIdentity = async (req, res) => {
  const transaction = await sequelize.transaction();
  const patient_id = req.params.id;
  const {
    patientId,
    familyId,
    firstPicture,
    lastPicture,
    prenom,
    nom,
    postnom,
    sexe,
    dateNaissance,
    provenance,
    modeArriver,
    adresse,
    vivreAvecParents,
    tuteur,
    rangFratrie,
    tailleFratrie,
  } = req.body;
  const anthroId = await anthropometrique.findAll({
    limit: 1,
    where: { patientId: patientId },
    order: [["createdAt", "DESC"]],
  });
  // console.log(` patient id = ${patient_id}`);
  try {
    const identity = {
      nom_patient: nom,
      postnom_patient: postnom,
      prenom_patient: prenom,
      sexe_patient: sexe,
      date_naissance_patient: dateNaissance,
      adresse_patient: adresse,
      provenance_patient: provenance,
      mode_arrive: modeArriver,
    };
    const identityAnthro = {
      first_picture: firstPicture,
      last_picture: lastPicture,
    };
    const identityFratrie = {
      rang_fratrie: rangFratrie,
      taille_fratrie: tailleFratrie,
    };
    const identityFamily = {
      vivre_deux_parents: vivreAvecParents,
      tuteur: tuteur,
    };
    const updatedPatient = await patient.update(
      identity,
      { where: { id: patientId } },
      { transaction }
    );
    const updatedCause = await cause_malnutrition.update(
      identityFratrie,
      { where: { patientId: patientId } },
      { transaction }
    );
    const updatedAnthro = await anthropometrique.update(
      identityAnthro,
      {
        where: { id: anthroId[0].id },
      },
      { transaction }
    );
    const updatedFamily = await famille.update(
      identityFamily,
      { where: { id: familyId } },
      { transaction }
    );
    if (updatePatient && updatedAnthro && updatedCause && updatedFamily) {
      await transaction.commit().then(() => {
        return res.status(200).send({ message: `UPDATE done Succefully` });
      });
    } else {
      throw new Error("UPDATE error occured");
    }
  } catch (error) {
    console.log(
      `${error.message} - id_patient: ${patient_id}, id_anthro: ${anthroId}, id_family: ${familyId}`
    );
    await transaction.rollback().then(() => {
      res.status(500).send({ message: error.message });
    });
  }
};
const updateCauseMalnutrition = async (req, res) => {
  const transaction = await sequelize.transaction();
  const patient_id = req.params.id;
  const {
    patientId,
    familyId,
    termeGrossesse,
    eig,
    lieuAccouchement,
    asphyxiePerinatale,
    dpm,
    sejourNeo,
    poidsNaissance,
    allaitementExclusifSixMois,
    diversificationAliment,
    constitutionAliment,
    consommationPoisson,
    calendrierVaccin,
    vaccinationRougeole,
    atcdMas,
    tbc,
    transfererUnt,
    hospitalisationRecente,
    diagnostiqueHospitalisation,
  } = req.body;
  try {
    const cause = {
      atcd_mas: atcdMas,
      terme_grossesse: termeGrossesse,
      eig: eig,
      lieu_accouchement: lieuAccouchement,
      asphyxie_perinatal: asphyxiePerinatale,
      dpm: dpm,
      cause_dpm: dpm !== "Normal" ? dpm : "Aucun",
      sejour_neonat: sejourNeo,
      allaitement_6mois: allaitementExclusifSixMois === 6 ? true : false,
      age_fin_allaitement: allaitementExclusifSixMois,
      diversification_aliment: diversificationAliment,
      constitution_aliment: constitutionAliment,
      calendrier_vaccinal:
        calendrierVaccin !== "Calendrier vaccinal à jour"
          ? "Calendrier vaccinal non à jour"
          : calendrierVaccin,
      vaccin_non_recu:
        calendrierVaccin !== "Calendrier vaccinal à jour"
          ? calendrierVaccin
          : "Calendrier vaccinal à jour",
      vaccination_rougeole: vaccinationRougeole,
      tbc: tbc,
      hospitalisation_recente: hospitalisationRecente,
      diagnostique_hospitalisation:
        hospitalisationRecente === true ? diagnostiqueHospitalisation : "rien",
    };
    const causePatientIdentity = {
      poids_naissance: poidsNaissance,
      transferer_unt: transfererUnt,
    };
    const causeNutrition = {
      consommation_poisson: consommationPoisson,
    };
    const updatedCause = await cause_malnutrition.update(
      cause,
      { where: { patientId: patient_id } },
      { transaction }
    );
    const updatedCauseIdentity = await patient.update(
      causePatientIdentity,
      { where: { id: patientId } },
      { transaction }
    );
    const updatedCauseNutrition = await famille.update(
      causeNutrition,
      { where: { id: familyId } },
      { transaction }
    );
    if (updatedCause && updatedCauseIdentity && updatedCauseNutrition) {
      await transaction.commit().then(() => {
        return res.status(200).send({ message: `UPDATE done Succefully` });
      });
    } else {
      throw new Error("UPDATE error occured");
    }
  } catch (error) {
    await transaction.rollback().then(() => {
      res.status(500).send({ message: error.message });
    });
  }
};
const updateMere = async (req, res) => {
  const transaction = await sequelize.transaction();
  const {
    familyId,
    mereEnVie,
    dateNaissanceMere,
    statutMarital,
    etatMere,
    contraceptionMere,
    contraceptionType,
    methodeContraceptive,
    scolariteMere,
    professionMere,
  } = req.body;
  try {
    const mere = {
      mere_en_vie: mereEnVie,
      age_mere: dateNaissanceMere,
      statut_marital: statutMarital,
      etat_mere: etatMere,
      contraception_mere: contraceptionMere,
      type_contraception:
        contraceptionMere === false
          ? "pas de contraception"
          : contraceptionType,
      contraception_naturelle:
        contraceptionMere === false
          ? "pas de contraception naturel"
          : contraceptionType === "Naturel"
          ? methodeContraceptive
          : "",
      contraception_moderne:
        contraceptionMere === false
          ? "pas de contraception moderne"
          : contraceptionType === "Moderne"
          ? methodeContraceptive
          : "",
      scolarite_mere: scolariteMere,
      profession_mere: professionMere,
    };
    const updatedMere = await famille.update(
      mere,
      { where: { id: familyId } },
      { transaction }
    );
    if (updatedMere) {
      await transaction.commit().then(() => {
        return res.status(200).send({ message: `UPDATE done Succefully` });
      });
    } else {
      throw new Error("UPDATE error occured");
    }
  } catch (error) {
    await transaction.rollback().then(() => {
      res.status(500).send({ message: error.message });
    });
  }
};
const updatePere = async (req, res) => {
  const patient_id = req.params.id;
  const transaction = await sequelize.transaction();
  const {
    familyId,
    pereEnVie,
    professionChefMenage,
    regimeMatrimonial,
    nbrFemme,
    telephone,
  } = req.body;
  try {
    const pere = {
      pere_en_vie: pereEnVie,
      profession_chef_menage: professionChefMenage,
      type_statut_marital: regimeMatrimonial,
      nbre_femme_perem: nbrFemme,
    };
    const numeroPere = {
      telephone: telephone,
    };
    const updatedPere = await famille.update(
      pere,
      { where: { id: familyId } },
      { transaction }
    );
    const updatedNumeroPere = await patient.update(
      numeroPere,
      { where: { id: patient_id } },
      { transaction }
    );
    if (updatedPere && updatedNumeroPere) {
      await transaction.commit().then(() => {
        return res.status(200).send({ message: `UPDATE done Succefully` });
      });
    } else {
      throw new Error("UPDATE error occured");
    }
  } catch (error) {
    await transaction.rollback().then(() => {
      res.status(500).send({ message: error.message });
    });
  }
};
const updateMenage = async (req, res) => {
  const transaction = await sequelize.transaction();
  const patient_id = req.params.id;
  const {
    familyId,
    tailleMenage,
    tribu,
    religion,
    niveauSocioEconomique,
    nbrRepasJour,
    possederTeleRadio,
    terrainVih,
    tbcChezParent,
    atcdTbcFratrie,
    atcdRougeole,
  } = req.body;
  try {
    const menage = {
      taille_menage: tailleMenage,
      tribu: tribu,
      religion: religion,
      niveau_socioeconomique: niveauSocioEconomique,
      nbre_repas: nbrRepasJour,
      posseder_radio_tele: possederTeleRadio,
      tbc_parents: tbcChezParent,
    };
    const menageATCD = {
      atcd_rougeole_fratrie: atcdRougeole,
      terrain_vih: terrainVih,
      atcd_du_tbc_dans_fratrie: atcdTbcFratrie,
    };
    const updatedMenage = await famille.update(
      menage,
      { where: { id: familyId } },
      { transaction }
    );
    const updatedMenageATCD = await cause_malnutrition.update(
      menageATCD,
      { where: { patientId: patient_id } },
      { transaction }
    );
    if (updatedMenage && updatedMenageATCD) {
      await transaction.commit().then(() => {
        return res.status(200).send({ message: `UPDATE done Succefully` });
      });
    } else {
      throw new Error("UPDATE error occured");
    }
  } catch (error) {
    await transaction.rollback().then(() => {
      res.status(500).send({ message: error.message });
    });
  }
};
const UpdateEtatSortie = async (req, res) => {
  const patient_id = req.params.id;
  const { declarer_sorti, modalite_sortie } = req.body;
  await patient
    .update(req.body, { where: { id: patient_id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};
// const deletePatient = async (req, res) => {
//   if (req.user.is_admin !== true)
//     return res.status(400).send("Access denied. You are not an admin.");
//   try {
//     const result = await sequelize.transaction(async (t) => {
//       const patient_id = req.params.id;
//       const patientFind = await patient.findOne({
//         where: { id: patient_id },
//       });
//       if (patientFind) {
//         patientFind.destroy({
//           force: true,
//         });
//         res.status(200).json({
//           message: `Le patient  a été supprimé`,
//         });
//       }
//       res.status(400).json({
//         error: `Le patient ayant l'identifiant ${patient_id} est introuvable`,
//       });
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: `${error}`,
//     });
//   }
// };
const deletePatient = async (req, res) => {
  if (req.user.is_admin !== true)
    return res.status(400).send("Access denied. You are not an admin.");
  const id = req.params.id;
  await patient
    .destroy({ where: { id: id }, force: true })
    .then(() => {
      res.status(200).send({ message: `patient ${id} deleted` });
    })
    .catch((error) => {
      res.send({ message: error.message });
    });
};
const detailPatient = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const patient_id = res.id_patient;
      const Patient = await patient.findOne({
        where: { id_patient: patient_id },
        attributes: [
          "id",
          "id_patient",
          "nom_patient",
          "postnom_patient",
          "prenom_patient",
          "sexe_patient",
          "date_naissance_patient",
          "adresse_patient",
          "provenance_patient",
          "mode_arrive",
          "telephone",
          "familleId",
        ],
      });
      if (!Patient) {
        res.status(400).json({
          error: `Le patient ayant l'identifiant ${patient_id} est introuvable`,
        });
      } else {
        const id_famillePatient = Patient.familleId;
        const id_patient = Patient.id;
        const Anthropometrique = await anthropometrique.findAll({
          where: { patientId: id_patient },
          order: [["id", "DESC"]],
          attributes: [
            "id",
            "date_admission_patient",
            "date_guerison_patient",
            "first_picture",
            "last_picture",
            "commentaires",
            "peri_cranien",
            "peri_brachial",
            "poids",
            "taille",
            "type_malnutrition",
            "createdAt",
          ],
        });
        const consultants = await consulter_par.findAll({
          where: { patientId: id_patient },
          paranoid: false,
          order: [["id", "DESC"]],
          attributes: [],
          include: [
            {
              model: user,
              attributes: [
                "id_user",
                "nom_user",
                "postnom_user",
                "prenom_user",
                "sexe_user",
              ],
              paranoid: false,
            },
          ],
        });
        res.status(200).json({
          Anthropometrique,
          consultants,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};
const searchPatient = async (req, res) => {
  const { nom_patient } = res;
  try {
    const result = await sequelize.transaction(async (t) => {
      const Patients = await sequelize.query(
        `select Pa.id_patient, nom_patient, postnom_patient, date(date_naissance_patient) as date_naissance, prenom_patient, Pa.sexe_patient, Anthr.type_malnutrition, date(Date_Consultation) as date_Consultation, nom_user as nom_consultant, postnom_user as postnom_consultant  from
        patients as Pa
        inner join ( 
          SELECT id, patientId, type_malnutrition, createdAt as Date_Consultation
          FROM anthropometriques
          WHERE createdAt IN (
            SELECT MAX(createdAt)
            FROM anthropometriques
            GROUP BY patientId
          )
        ) as Anthr
        on Anthr.patientId = Pa.id
        inner join (
        SELECT id, patientId, userId
        FROM consulter_pars
        WHERE createdAt IN (
            SELECT MAX(createdAt)
            FROM consulter_pars
            GROUP BY patientId
        )
        ) as Cons
        on Anthr.patientId = Cons.patientId 
        inner join users
        on Cons.userId = users.id 
        WHERE Pa.nom_patient like :nom_patientParam OR Pa.postnom_patient like :nom_patientParam
        ORDER BY Pa.id DESC`,
        {
          replacements: {
            nom_patientParam: "%" + nom_patient + "%",
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      res.status(200).json(Patients);
    });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
const exportPatient = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const Patients = await sequelize.query(
        `select Pa.id_patient, nom_patient, postnom_patient, date(date_naissance_patient) as date_naissance, prenom_patient, Pa.sexe_patient, Anthr.type_malnutrition, Anthr.date_admission_patient, Anthr.peri_cranien, Anthr.peri_brachial, Anthr.poids, Anthr.taille, Anthr.type_malnutrition, Anthr.date_guerison_patient, Anthr.commentaires, date(Date_Consultation) as date_Consultation, nom_user as nom_consultant, postnom_user as postnom_consultant  from
        patients as Pa
        inner join ( 
          SELECT id, patientId,date_admission_patient,peri_cranien,peri_brachial,poids,taille,type_malnutrition,date_guerison_patient,commentaires, createdAt as Date_Consultation
          FROM anthropometriques
          WHERE createdAt IN (
            SELECT MAX(createdAt)
            FROM anthropometriques
            GROUP BY patientId
          )
        ) as Anthr
        on Anthr.patientId = Pa.id
        inner join (
        SELECT id, patientId, userId
        FROM consulter_pars
        WHERE createdAt IN (
            SELECT MAX(createdAt)
            FROM consulter_pars
            GROUP BY patientId
        )
        ) as Cons
        on Anthr.patientId = Cons.patientId 
        inner join users
        on Cons.userId = users.id
        ORDER BY Pa.id DESC
        `,
        {
          type: QueryTypes.SELECT,
        }
      );
      res.status(200).json(Patients);
    });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
const transfertPatient = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { id_patient } = res;
      const patientFind = await patient.findOne({
        where: { id_patient },
      });
      if (patientFind) {
        await patient.update(
          {
            transferer_unt: true,
          },
          {
            where: {
              id_patient,
            },
          }
        );
        res.status(200).json({
          message: `Le patient transféré à UNT avec succès`,
        });
      }
      res.status(400).json({
        error: `Le patient ayant l'identifiant ${id_patient} est introuvable`,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: `${error}`,
    });
  }
};

module.exports = {
  addPatient,
  getPatient,
  updatePatient,
  updatePatientIdentity,
  updateCauseMalnutrition,
  updateMere,
  updatePere,
  updateMenage,
  UpdateEtatSortie,
  getAllPatient,
  deletePatient,
  detailPatient,
  searchPatient,
  exportPatient,
  transfertPatient,
};
