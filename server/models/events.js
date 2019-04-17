'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', 
  {
    eventType: DataTypes.STRING,
  });
  events.associate = function(models) {
    events.hasMany(models.bookings,
      {
        foreignKey:'eventTypeid',
        as:'eventTypeid',
  })
};
  return events;
};