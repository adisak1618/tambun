'use strict';
module.exports = (sequelize, DataTypes) => {
  const redeem = sequelize.define('redeem', {
    shop_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    reward_id: DataTypes.INTEGER,
    point: DataTypes.INTEGER
  }, {});
  redeem.associate = function(models) {
    // associations can be defined here
  };
  return redeem;
};