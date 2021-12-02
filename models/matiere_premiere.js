"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class matiere_premiere extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      matiere_premiere.hasMany(models.matiere_produit, {
        foreignKey: "matiere_id",
      });
    }
  }
  matiere_premiere.init(
    {
      libelle_matiere: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qte_matiere: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prix_achat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      affectation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "matiere_premiere",
    }
  );
  return matiere_premiere;
};
