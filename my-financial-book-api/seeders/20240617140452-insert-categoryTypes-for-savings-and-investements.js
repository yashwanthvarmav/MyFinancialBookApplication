'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'CategoryTypes',
      [
        {
          id: 3,
          name: 'SavingsAndInvestments',
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
