'use strict';
module.exports = (sequelize, DataTypes) => {
  const transection = sequelize.define('transection', {
    user_id: DataTypes.INTEGER,
    shop_id: DataTypes.INTEGER,
    point: DataTypes.INTEGER
  }, {});
  transection.associate = function(models) {
    // associations can be defined here
  };
  return transection;
};