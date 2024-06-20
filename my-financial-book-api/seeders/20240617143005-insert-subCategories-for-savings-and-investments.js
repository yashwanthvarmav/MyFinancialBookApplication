'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'SubCategories',
      [
        {
          id: 98,
          name: 'Short-term Savings',
          categoryId: 28,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 99,
          name: 'Cash Reserves',
          categoryId: 28,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 100,
          name: 'General Savings',
          categoryId: 29,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 101,
          name: 'Vacation Fund',
          categoryId: 29,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 102,
          name: 'Major Purchase Fund (e.g., car, home appliances)',
          categoryId: 29,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 103,
          name: '401(k)',
          categoryId: 30,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 104,
          name: 'Roth IRA',
          categoryId: 30,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 105,
          name: 'Traditional IRA',
          categoryId: 30,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 106,
          name: 'Pension Plans',
          categoryId: 30,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 107,
          name: '529 Plan',
          categoryId: 31,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 108,
          name: 'Education Savings Account (ESA)',
          categoryId: 31,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 109,
          name: 'Health Savings Account (HSA)',
          categoryId: 32,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 110,
          name: 'Medical Emergency Fund',
          categoryId: 32,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 111,
          name: 'Down Payment Fund',
          categoryId: 33,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 112,
          name: 'Home Improvement Fund',
          categoryId: 33,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 113,
          name: 'Individual Stocks',
          categoryId: 34,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 114,
          name: 'Exchange-Traded Funds (ETFs)',
          categoryId: 34,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 115,
          name: 'Mutual Funds',
          categoryId: 34,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 116,
          name: 'Government Bonds',
          categoryId: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 117,
          name: 'Corporate Bonds',
          categoryId: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 118,
          name: 'Municipal Bonds',
          categoryId: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 119,
          name: 'Fixed Deposit',
          categoryId: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 120,
          name: 'Recurring Deposit',
          categoryId: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 121,
          name: 'Certificates of Deposit (CDs)',
          categoryId: 35,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 122,
          name: 'Rental Properties',
          categoryId: 36,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 123,
          name: 'Real Estate Investment Trusts (REITs)',
          categoryId: 36,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 124,
          name: 'Real Estate Crowdfunding',
          categoryId: 36,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 125,
          name: '401(k)',
          categoryId: 37,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 126,
          name: 'Roth IRA',
          categoryId: 37,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 127,
          name: 'Traditional IRA',
          categoryId: 37,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 128,
          name: 'SEP IRA',
          categoryId: 37,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 129,
          name: 'Commodities (e.g., Gold, Silver)',
          categoryId: 38,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 130,
          name: 'Cryptocurrency',
          categoryId: 38,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 131,
          name: 'Hedge Funds',
          categoryId: 38,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 132,
          name: 'Private Equity',
          categoryId: 38,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 133,
          name: 'Startups',
          categoryId: 39,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 134,
          name: 'Small Business Equity',
          categoryId: 39,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 135,
          name: 'Franchise Investments',
          categoryId: 39,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 136,
          name: 'Courses and Certifications',
          categoryId: 40,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 137,
          name: 'Professional Development Programs',
          categoryId: 40,
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
    return queryInterface.bulkDelete('SubCategories', null, {});
  },
};
