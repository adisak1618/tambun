'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      birtday: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.CHAR(1)
      },
      estimate_age: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('users');
  }
};