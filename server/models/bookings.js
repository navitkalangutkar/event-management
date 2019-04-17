'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookings = sequelize.define('bookings', {
    eventName: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    bookingDate: DataTypes.DATE,
    userid: DataTypes.INTEGER,
    eventTypeid: DataTypes.INTEGER,
    managerid: DataTypes.INTEGER
  });
  bookings.associate = function(models) {
    bookings.belongsTo(models.events, 
      {
        foreignKey:'eventTypeid',
      }), 
      bookings.belongsTo(models.users, 
        {
          foreignKey:'userid',
        }),
        bookings.belongsTo(models.managers, 
          {
            foreignKey:'managerid',
          });
  };
  return bookings
};