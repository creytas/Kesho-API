"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("patients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_patient: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      nom_patient: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      postnom_patient: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      prenom_patient: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      sexe_patient: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date_naissance_patient: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      adresse_patient: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      provenance_patient: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mode_arrive: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      poids_naissance: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      telephone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      familleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "familles",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      transferer_unt: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      declarer_gueri: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      declarer_sorti: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      modalite_sortie: {
        allowNull: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("patients");
  },
};
