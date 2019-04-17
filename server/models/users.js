'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    address: DataTypes.STRING,
    contactNumber: DataTypes.BIGINT,
    toWhomPersonName: DataTypes.STRING,
    age: DataTypes.INTEGER
  });
  users.associate = function(models) {
    users.hasMany(models.bookings,
      {
        foreignKey:'userid',
        as:'userid',
  })
};
  return users;
};