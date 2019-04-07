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
    models.reward.belongsTo(models.shop, { as: 'shop', foreignKey: 'shop_id', targetKey: 'id' });
  };
  return reward;
};