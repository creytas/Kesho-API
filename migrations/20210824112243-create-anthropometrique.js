"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("anthropometriques", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_anthropometrique: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      date_admission_patient: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      date_guerison_patient: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      first_picture: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      last_picture: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      commentaires: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      peri_cranien: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      peri_brachial: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      poids: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      taille: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      hemoglobine: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      hematocrite: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      ration_seche: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      type_oedeme: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      type_malnutrition: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      patientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "patients",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("anthropometriques");
  },
};
