'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_card = sequelize.define('user_card', {
    shop_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    point: DataTypes.INTEGER
  }, {});
  user_card.associate = function(models) {
    // associations can be defined here
    models.user_card.belongsTo(models.user, { as: 'card_owner', foreignKey: 'user_id', targetKey: 'id' });
    models.user_card.belongsTo(models.shop, { as: 'shop', foreignKey: 'shop_id', targetKey: 'id' });
  };
  return user_card;
};