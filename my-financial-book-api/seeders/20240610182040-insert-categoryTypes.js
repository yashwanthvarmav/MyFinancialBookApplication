'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'CategoryTypes',
      [
        {
          id: 1,
          name: 'Income',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Expense',
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
