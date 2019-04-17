'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bookingDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userid: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key: 'id',
          as:'userid',
        },
      },
        eventTypeid: {
          type: Sequelize.INTEGER,
          references:{
            model:'events',
            key: 'id',
            as:'eventTypeid',
          },
        },
          managerid: {
            type: Sequelize.INTEGER,
            references:{
              model:'managers',
              key: 'id',
              as:'managerid',
            },
          },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookings');
  }
};