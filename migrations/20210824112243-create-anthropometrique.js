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
      peri_cranien: {
        allowNull: false,
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
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      ration_seche: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
