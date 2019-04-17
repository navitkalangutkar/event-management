'use strict';
module.exports = (sequelize, DataTypes) => {
  const managers = sequelize.define('managers', {
    managerName: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    isActive: DataTypes.BOOLEAN,
    isOrganisingEvent: DataTypes.BOOLEAN
  });
  managers.associate = function(models) {
    managers.hasMany(models.bookings,
      {
        foreignKey:'managerid',
        as:'managerid',
  })
};
  return managers;
};