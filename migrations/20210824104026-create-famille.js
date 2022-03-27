"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("familles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_famille: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      taille_menage: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      vivre_deux_parents: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      tuteur: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      age_tuteur: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      etat_mere: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      pere_en_vie: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      mere_en_vie: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      age_mere: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      profession_mere: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      profession_chef_menage: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      scolarite_mere: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contraception_mere: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      type_contraception: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contraception_naturelle: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      contraception_moderne: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      niveau_socioeconomique: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      statut_marital: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type_statut_marital: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nbre_femme_pere: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      tribu: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      religion: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      posseder_radio_tele: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      nbre_repas: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      consommation_poisson: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      atb: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      liste_atb: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      tbc_parents: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      tbc_chez: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tbc_gueris: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      duree_traitement_tbc: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tbc_declarer_finie: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("familles");
  },
};
