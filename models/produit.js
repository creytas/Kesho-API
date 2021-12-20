"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class produit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      produit.hasMany(models.matiere_produit, {
        foreignKey: "produit_id",
      });
    }
  }
  produit.init(
    {
      libelle_produit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qte_produit: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      prix_unitaire: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date_production: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "produit",
    }
  );
  return produit;
};
