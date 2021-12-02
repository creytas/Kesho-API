"use strict";
const UUIDV4 = require("uuid")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      nom_user: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      postnom_user: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      prenom_user: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sexe_user: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      is_admin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      statut: {
        allowNull: false,
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
    await queryInterface.dropTable("users");
  },
};
