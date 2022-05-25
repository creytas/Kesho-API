const {
  patient,
  cause_malnutrition,
  famille,
  anthropometrique,
  consulter_par,
  user,
  sequelize,
} = require("../models");

const addAnthropometrique = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const {
        peri_cranien,
        peri_brachial,
        poids,
        taille,
        type_malnutrition,
        date_examen,
        ration_seche,
        type_oedeme,
        hemoglobine,
        hematocrite,
        commentaires,
        date_admission_patient,
        first_picture,
      } = req.body;
      const { id_patient } = req.query;
      const { id_user } = req.user;

      const patientFind = await patient.findOne({
        where: { id_patient },
        attributes: ["id", "id_patient", "transferer_unt"],
      });
      const userFind = await user.findOne({
        where: { id_user },
        attributes: ["id"],
      });
      if (patientFind && userFind) {
        const patientId = patientFind.id,
          userId = userFind.id;
        //type_malnutrition==="Guéri"?date_guerison_patient:new Date():"";
        if (type_malnutrition === "Guéri") {
          date_guerison_patient = new Date();
        } else {
          date_guerison_patient = null;
        }
        await anthropometrique.create({
          peri_cranien,
          peri_brachial,
          poids,
          taille,
          type_malnutrition,
          createdAt: date_examen,
          patientId,
          ration_seche,
          type_oedeme,
          hematocrite,
          hemoglobine,
          commentaires,
          date_admission_patient,
          date_guerison_patient,
          first_picture,
        });

        if (patientFind.transferer_unt) {
          await patient.update(
            {
              transferer_unt: !patientFind.transferer_unt,
            },
            {
              where: {
                id_patient,
              },
            }
          );
        }

        await consulter_par.create({
          patientId,
          userId,
        });
        return res
          .status(200)
          .json({ message: "Enregistrement effectuer avec succès" });
      } else {
        res.status(400).json({
          error: "Le patient non trouvé ou l'utilisateur non trouvé",
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};
const getAnthropometriqueByIdPatient = async (req, res) => {
  const { patientId } = res;
  try {
    const result = await sequelize.transaction(async (t) => {
      const patientFind = await patient.findOne({
        where: { id_patient: patientId },
        attributes: ["id"],
      });
      const id = patientFind.id;

      if (!patientFind) {
        res.status(400).json({ error: "Le patient non trouvé" });
      } else {
        const anthropometriqueOnePatient =
          await anthropometrique.findAndCountAll({
            where: { patientId: id },
            order: [["id", "DESC"]],
            limit: 3,
          });

        const consultant = await consulter_par.findAll({
          where: { patientId: id },
          order: [["id", "DESC"]],
          limit: 3,
        });
        res.status(200).json({ anthropometriqueOnePatient, consultant });
      }
    });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const updateAnthropometrique = async (req, res) => {
  const id = req.params.id;
  const {
    date_consultation,
    peri_brachial,
    peri_cranien,
    type_malnutrition,
    commentaires,
    poids,
    taille,
  } = req.body;
  try {
    const anthro = {
      createdAt: date_consultation,
      peri_brachial,
      peri_cranien,
      type_malnutrition,
      commentaires,
      poids,
      taille,
    };
    const updatedAnthro = await anthropometrique
      .update(anthro, { where: { id: id } })
      .then((data) => {
        res.status(200).send(`${data} updated successfully`);
      })
      .catch((err) => {
        res.status(400).send(`UPDATE error occured`);
      });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
const deleteAnthropometrique = async (req, res) => {
  if (req.user.is_admin !== true)
    return res.status(400).send("Access denied. You are not an admin.");
  try {
    const result = await sequelize.transaction(async (t) => {
      const id = req.params.id;
      const anthroFind = await anthropometrique.findOne({ where: { id: id } });

      if (anthroFind) {
        const anthroDelete = await anthropometrique.destroy({
          where: {
            id,
          },
        });
        return res.status(200).json({
          message: `le rendez-vous est supprimé avec succès`,
        });
      } else {
        return res.status(400).json({
          message: `Le rendez-vous ayant l'identifiant ${id} est introuvable`,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: `${error}`,
    });
  }
};

module.exports = {
  addAnthropometrique,
  getAnthropometriqueByIdPatient,
  updateAnthropometrique,
  deleteAnthropometrique,
};
