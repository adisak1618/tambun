'use strict';
module.exports = (sequelize, DataTypes) => {
  const shop = sequelize.define('shop', {
    name: DataTypes.STRING,
    shortdescription: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    cover: DataTypes.STRING,
    detail: DataTypes.TEXT,
    tel: DataTypes.STRING
  }, {});
  shop.associate = function(models) {
    // associations can be defined here
  };
  return shop;
};