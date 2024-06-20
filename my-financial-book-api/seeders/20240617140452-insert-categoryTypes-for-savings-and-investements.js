'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'CategoryTypes',
      [
        {
          id: 3,
          name: 'Savings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Investments',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {},
      {
        id: {
          autoIncrement: true,
        },
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CategoryTypes', null, {});
  },
};
