'use strict';
module.exports = (sequelize, DataTypes) => {
  const line_user = sequelize.define('line_user', {
    user_id: DataTypes.INTEGER,
    lineid: DataTypes.STRING,
    path: DataTypes.STRING
  }, {});
  line_user.associate = function(models) {
    // associations can be defined here
    models.line_user.belongsTo(models.user, { as: 'user', foreignKey: 'user_id', targetKey: 'id' });
  };
  return line_user;
};