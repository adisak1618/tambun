'use strict';
module.exports = (sequelize, DataTypes) => {
  const shop = sequelize.define('shop', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    shortdescription: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    cover: DataTypes.STRING,
    detail: DataTypes.TEXT,
    tel: DataTypes.STRING
  }, {});
  shop.associate = function(models) {
    // associations can be defined here
    models.shop.belongsTo(models.user, { as: 'owner', foreignKey: 'user_id', targetKey: 'id' });
    models.shop.hasMany(models.reward, { as: 'reward', foreignKey: 'shop_id', targetKey: 'id' });
  };
  return shop;
};