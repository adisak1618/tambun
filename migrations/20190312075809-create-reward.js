'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rewards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shop_id: {
        type: Sequelize.INTEGER
      },
      redeempoint: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.TEXT
      },
      picture: {
        type: Sequelize.STRING
      },
      expire: {
        type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rewards');
  }
};