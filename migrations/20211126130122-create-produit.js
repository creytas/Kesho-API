"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("produits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      libelle_produit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qte_produit: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      prix_unitaire: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      date_production: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("produits");
  },
};
