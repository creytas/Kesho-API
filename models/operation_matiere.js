'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class operation_matiere extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  operation_matiere.init({
    date_operation: DataTypes.DATE,
    matiere_id: DataTypes.INTEGER,
    type_operation: DataTypes.STRING,
    qte_operation: DataTypes.INTEGER,
    commentaire_operation: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'operation_matiere',
  });
  return operation_matiere;
};