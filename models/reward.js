'use strict';
module.exports = (sequelize, DataTypes) => {
  const reward = sequelize.define('reward', {
    shop_id: DataTypes.INTEGER,
    redeempoint: DataTypes.INTEGER,
    name: DataTypes.STRING,
    detail: DataTypes.TEXT,
    picture: DataTypes.STRING,
    expire: DataTypes.DATE
  }, {});
  reward.associate = function(models) {
    // associations can be defined here
  };
  return reward;
};