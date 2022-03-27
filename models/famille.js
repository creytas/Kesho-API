"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class famille extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.famille.hasMany(models.patient, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  famille.init(
    {
      id_famille: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      taille_menage: DataTypes.INTEGER,
      vivre_deux_parents: DataTypes.BOOLEAN,
      tuteur: DataTypes.STRING,
      age_tuteur: DataTypes.INTEGER,
      etat_mere: DataTypes.STRING,
      pere_en_vie: DataTypes.BOOLEAN,
      mere_en_vie: DataTypes.BOOLEAN,
      age_mere: DataTypes.INTEGER,
      profession_mere: DataTypes.STRING,
      profession_chef_menage: DataTypes.STRING,
      scolarite_mere: DataTypes.STRING,
      contraception_mere: DataTypes.BOOLEAN,
      type_contraception: DataTypes.STRING,
      contraception_naturelle: DataTypes.STRING,
      contraception_moderne: DataTypes.STRING,
      niveau_socioeconomique: DataTypes.STRING,
      statut_marital: DataTypes.STRING,
      type_statut_marital: DataTypes.STRING,
      nbre_femme_pere: DataTypes.INTEGER,
      tribu: DataTypes.STRING,
      religion: DataTypes.STRING,
      posseder_radio_tele: DataTypes.BOOLEAN,
      nbre_repas: DataTypes.INTEGER,
      consommation_poisson: DataTypes.BOOLEAN,
      atb: DataTypes.BOOLEAN,
      liste_atb: DataTypes.TEXT,
      tbc_parents: DataTypes.BOOLEAN,
      tbc_chez: DataTypes.STRING,
      tbc_gueris: DataTypes.BOOLEAN,
      duree_traitement_tbc: DataTypes.STRING,
      tbc_declarer_finie: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "famille",
    }
  );
  return famille;
};
