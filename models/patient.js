"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.patient.hasMany(models.anthropometrique, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.patient.belongsToMany(
        models.user,
        { through: "consulter_par" },
        {
          // onDelete: "CASCADE",
          onUpdate: "CASCADE",
        }
      );
      models.patient.hasMany(models.cause_malnutrition, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.patient.belongsTo(models.famille, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  patient.init(
    {
      id_patient: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nom_patient: DataTypes.STRING,
      postnom_patient: DataTypes.STRING,
      prenom_patient: DataTypes.STRING,
      sexe_patient: DataTypes.STRING,
      date_naissance_patient: DataTypes.DATE,
      adresse_patient: DataTypes.TEXT,
      provenance_patient: DataTypes.STRING,
      mode_arrive: DataTypes.STRING,
      poids_naissance: DataTypes.FLOAT,
      telephone: DataTypes.STRING,
      familleId: DataTypes.INTEGER,
      transferer_unt: DataTypes.BOOLEAN,
      declarer_gueri: DataTypes.BOOLEAN,
      declarer_sorti: DataTypes.BOOLEAN,
      modalite_sortie: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "patient",
    }
  );
  return patient;
};
