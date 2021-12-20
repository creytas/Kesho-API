"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class operation_matiere extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      operation_matiere.belongsTo(models.matiere_premiere,{
        foreignKey:"matiere_id"
      })
    }
  }
  operation_matiere.init(
    {
      date_operation: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      matiere_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type_operation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qte_operation: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      commentaire_operation: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "operation_matiere",
    }
  );
  return operation_matiere;
};
