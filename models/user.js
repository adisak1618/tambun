'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    fullname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.TEXT,
    birtday: DataTypes.DATE,
    gender: {
      type:   Sequelize.ENUM,
      values: ['f', 'm', 'o']
    },
    estimate_age: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};