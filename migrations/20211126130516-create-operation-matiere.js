"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("operation_matieres", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date_operation: {
        type: Sequelize.DATE,
        allowNull: false,
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
      type_operation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qte_operation: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      commentaire_operation: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("operation_matieres");
  },
};
