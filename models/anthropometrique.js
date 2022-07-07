'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anthropometrique extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.anthropometrique.belongsTo(models.patient, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  };
  anthropometrique.init({
    id_anthropometrique : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    date_admission_patient: DataTypes.DATE,
    date_guerison_patient: DataTypes.DATE,
    first_picture: DataTypes.TEXT,
    last_picture: DataTypes.TEXT,
    commentaires:DataTypes.TEXT,
    peri_cranien: DataTypes.FLOAT,
    peri_brachial: DataTypes.FLOAT,
    poids: DataTypes.FLOAT,
    taille: DataTypes.FLOAT,
    hemoglobine: DataTypes.FLOAT,
    hematocrite: DataTypes.FLOAT,
    ration_seche: DataTypes.BOOLEAN,
    type_oedeme:DataTypes.STRING,
    type_malnutrition: DataTypes.STRING,
    patientId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'anthropometrique',
  });
  return anthropometrique;
};