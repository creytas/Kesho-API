"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class matiere_produit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      matiere_produit.belongsTo(models.matiere_premiere, {
        foreignKey: "matiere_id",
      });
      matiere_produit.belongsTo(models.produit, {
        foreignKey: "produit_id",
      });
    }
  }
  matiere_produit.init(
    {
      matiere_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      produit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qte_matiere: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "matiere_produit",
    }
  );
  return matiere_produit;
};
