"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cause_malnutrition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.cause_malnutrition.belongsTo(models.patient, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  cause_malnutrition.init(
    {
      id_causemalnutrition: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      atcd_mas: DataTypes.BOOLEAN,
      nbre_chute: DataTypes.INTEGER,
      mas_fratrie: DataTypes.BOOLEAN,
      terme_grossesse: DataTypes.STRING,
      sejour_neonat: DataTypes.BOOLEAN,
      eig: DataTypes.FLOAT,
      lieu_accouchement: DataTypes.STRING,
      asphyxie_perinatal: DataTypes.STRING,
      dpm: DataTypes.STRING,
      cause_dpm: DataTypes.TEXT,
      calendrier_vaccinal: DataTypes.TEXT,
      vaccin_non_recu: DataTypes.TEXT,
      rang_fratrie: DataTypes.STRING,
      taille_fratrie: DataTypes.INTEGER,
      atcd_rougeole_fratrie: DataTypes.BOOLEAN,
      vaccination_rougeole: DataTypes.BOOLEAN,
      terrain_vih: DataTypes.BOOLEAN,
      allaitement_6mois: DataTypes.BOOLEAN,
      age_fin_allaitement: DataTypes.INTEGER,
      tbc: DataTypes.BOOLEAN,
      atcd_du_tbc_dans_fratrie: DataTypes.BOOLEAN,
      hospitalisation_recente: DataTypes.BOOLEAN,
      diagnostique_hospitalisation: DataTypes.TEXT,
      produit_plante: DataTypes.BOOLEAN,
      duree_produit_plante: DataTypes.STRING,
      cocktail_atb: DataTypes.BOOLEAN,
      duree_prise_atb: DataTypes.STRING,
      traitement_nutri: DataTypes.STRING,
      diversification_aliment: DataTypes.INTEGER,
      constitution_aliment: DataTypes.TEXT,
      patientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "cause_malnutrition",
    }
  );
  return cause_malnutrition;
};
