"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class generator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  generator.init(
    {
      turned_on: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      turned_off: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      observation: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "generator",
    }
  );
  return generator;
};
