'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('operation_matieres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_operation: {
        type: Sequelize.DATE
      },
      matiere_id: {
        type: Sequelize.INTEGER
      },
      type_operation: {
        type: Sequelize.STRING
      },
      qte_operation: {
        type: Sequelize.INTEGER
      },
      commentaire_operation: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('operation_matieres');
  }
};