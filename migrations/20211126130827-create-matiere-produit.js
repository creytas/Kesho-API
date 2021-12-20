"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matiere_produits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      matiere_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "matiere_premieres",
          key: "id",
          as: "matiere_id",
        },
      },
      produit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "produits",
          key: "id",
          as: "produit_id",
        },
      },
      qte_matiere: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("matiere_produits");
  },
};
