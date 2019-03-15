'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_card = sequelize.define('user_card', {
    shop_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    point: DataTypes.INTEGER
  }, {});
  user_card.associate = function(models) {
    // associations can be defined here
  };
  return user_card;
};