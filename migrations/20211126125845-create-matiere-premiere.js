"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matiere_premieres", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      libelle_matiere: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qte_matiere: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      prix_achat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      affectation: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("matiere_premieres");
  },
};
