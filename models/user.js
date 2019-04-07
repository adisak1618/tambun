'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    fullname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.TEXT,
    follow: DataTypes.BOOLEAN,
    birtday: DataTypes.DATE,
    gender: {
      type:   DataTypes.ENUM,
      values: ['f', 'm', 'o']
    },
    estimate_age: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    models.user.hasOne(models.line_user, { as: 'lineUser', foreignKey: 'user_id', targetKey: 'id' });
    models.user.hasOne(models.shop, { as: 'shop', foreignKey: 'user_id', targetKey: 'id' });
    models.user.hasMany(models.user_card, { as: 'card', foreignKey: 'user_id', targetKey: 'id' });
  };
  return user;
};