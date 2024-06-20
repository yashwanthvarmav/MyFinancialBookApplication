'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 1,
          name: 'Housing',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Transportation',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Food and Groceries',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Utilities',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Health and Medical',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: 'Insurance',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: 'Debt Payments',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: 'Education',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          name: 'Personal Care',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          name: 'Entertainment and Leisure',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 11,
          name: 'Childcare and Other',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 12,
          name: 'Gifts and Donations',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 13,
          name: 'Clothing and Accessories',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 14,
          name: 'Travel and Vacation',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 15,
          name: 'Subscriptions and Memberships',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 16,
          name: 'Miscellaneous',
          categoryTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 17,
          name: 'Employment Income',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 18,
          name: 'Business Income',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 19,
          name: 'Investment Income',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 20,
          name: 'Government Benefits',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 21,
          name: 'Gifts and Inheritance',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 22,
          name: 'Savings and Investments Withdrawals',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 23,
          name: 'Side Jobs and Gigs',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 24,
          name: 'Royalties and Licensing',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 25,
          name: 'Refunds and Reimbursements',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 26,
          name: 'Scholarships and Grants',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 27,
          name: 'Miscellaneous Income',
          categoryTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
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
