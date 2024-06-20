'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 28,
          name: 'Emergency Fund',
          categoryTypeId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 29,
          name: 'Personal Savings',
          categoryTypeId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 30,
          name: 'Retirement Savings',
          categoryTypeId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 31,
          name: 'Education Savings',
          categoryTypeId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 32,
          name: 'Health Savings',
          categoryTypeId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 33,
          name: 'Home Savings',
          categoryTypeId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 34,
          name: 'Stock Market Investments',
          categoryTypeId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 35,
          name: 'Fixed-Income Investments',
          categoryTypeId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 36,
          name: 'Real Estate Investments',
          categoryTypeId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 37,
          name: 'Retirement Investments',
          categoryTypeId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 38,
          name: 'Alternative Investments',
          categoryTypeId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 39,
          name: 'Business Investments',
          categoryTypeId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 40,
          name: 'Education Investments',
          categoryTypeId: 4,
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
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
