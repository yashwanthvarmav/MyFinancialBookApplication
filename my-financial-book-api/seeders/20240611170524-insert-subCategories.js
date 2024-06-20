'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'SubCategories',
      [
        {
          id: 1,
          name: 'Rent',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Mortgage',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Property Taxes',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Home Insurance',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Maintenance and Repairs',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: 'Utilities (Electricity, Water, Gas etc..)',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: 'Fuel',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: 'Public Transportation',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          name: 'Vehicle Maintenance and Repairs',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          name: 'Vehicle Insurance',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 11,
          name: 'Parking Fees',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 12,
          name: 'Car Loan Payments',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 13,
          name: 'Groceries',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 14,
          name: 'Dining Out',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 15,
          name: 'Snacks and Beverages',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 16,
          name: 'Electricity',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 17,
          name: 'Water',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 18,
          name: 'Gas',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 19,
          name: 'Internet',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 20,
          name: 'Mobile Phone',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 21,
          name: 'Cable/Satellite TV',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 22,
          name: 'Medical Bills',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 23,
          name: 'Hospital Bills',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 24,
          name: 'Life Insurance',
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 25,
          name: 'Health Insurance',
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 26,
          name: 'Auto Insurance',
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 27,
          name: 'Homeowners/Renters Insurance',
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 28,
          name: 'Credit Card Payments',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 29,
          name: 'Personal Loan Payments',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 30,
          name: 'Education Loan Payments',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 31,
          name: 'Home Loan Payments',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 32,
          name: 'Car Loan Payments',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 33,
          name: 'Other EMIs',
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 34,
          name: 'Tuition Fees',
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 35,
          name: 'Books and Supplies',
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 36,
          name: 'Courses and Training',
          categoryId: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 37,
          name: 'Haircuts and Beauty Treatments',
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 38,
          name: 'Personal Hygiene Products',
          categoryId: 9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 39,
          name: 'Movies and Theaters',
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 40,
          name: 'Concerts and Events',
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 41,
          name: 'Hobbies',
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 42,
          name: 'Streaming Services (Netflix, Spotify, etc.)',
          categoryId: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 43,
          name: 'Daycare Fees',
          categoryId: 11,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 44,
          name: 'Extracurricular Activities',
          categoryId: 11,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 45,
          name: 'Gifts for Family and Friends',
          categoryId: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 46,
          name: 'Charitable Donations',
          categoryId: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 47,
          name: 'Clothing',
          categoryId: 13,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 48,
          name: 'Shoes',
          categoryId: 13,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 49,
          name: 'Accessories',
          categoryId: 13,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 50,
          name: 'Airfare',
          categoryId: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 51,
          name: 'Accommodation',
          categoryId: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 52,
          name: 'Travel Insurance',
          categoryId: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 53,
          name: 'Transportation (Rental Cars, Taxis)',
          categoryId: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 54,
          name: 'Meals and Entertainment',
          categoryId: 14,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 55,
          name: 'Gym Memberships',
          categoryId: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 56,
          name: 'Magazine Subscriptions',
          categoryId: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 57,
          name: 'Online Services Subscriptions',
          categoryId: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 58,
          name: 'Pet Care',
          categoryId: 16,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 59,
          name: 'Office Supplies',
          categoryId: 16,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 60,
          name: 'Miscellaneous Expenses',
          categoryId: 16,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 61,
          name: 'Salary/Wages',
          categoryId: 17,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 62,
          name: 'Overtime Pay',
          categoryId: 17,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 63,
          name: 'Bonuses',
          categoryId: 17,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 64,
          name: 'Tips',
          categoryId: 17,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 65,
          name: 'Sales Revenue',
          categoryId: 18,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 66,
          name: 'Service Income',
          categoryId: 18,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 67,
          name: 'Freelance/Contractor Income',
          categoryId: 18,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 68,
          name: 'Commission',
          categoryId: 18,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 69,
          name: 'Interest Income',
          categoryId: 19,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 70,
          name: 'Dividends',
          categoryId: 19,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 71,
          name: 'Rental Income',
          categoryId: 19,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 72,
          name: 'Capital Gains',
          categoryId: 19,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 73,
          name: 'Social Security',
          categoryId: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 74,
          name: 'Unemployment Benefits',
          categoryId: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 75,
          name: 'Disability Benefits',
          categoryId: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 76,
          name: 'Child Support',
          categoryId: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 77,
          name: 'Pension/Retirement Benefits',
          categoryId: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 78,
          name: 'Cash Gifts',
          categoryId: 21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 79,
          name: 'Inheritance',
          categoryId: 21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 80,
          name: 'Savings Account Withdrawals',
          categoryId: 22,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 81,
          name: 'Investment Account Withdrawals',
          categoryId: 22,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 82,
          name: 'Retirement Account Withdrawals',
          categoryId: 22,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 83,
          name: 'Part-Time Job Income',
          categoryId: 23,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 84,
          name: 'Gig Economy Income (e.g., Uber, Lyft, TaskRabbit)',
          categoryId: 23,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 85,
          name: 'Online Sales (e.g., eBay, Etsy)',
          categoryId: 23,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 86,
          name: 'Book Royalties',
          categoryId: 24,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 87,
          name: 'Music Royalties',
          categoryId: 24,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 88,
          name: 'Licensing Fees',
          categoryId: 24,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 89,
          name: 'Tax Refunds',
          categoryId: 25,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 90,
          name: 'Insurance Reimbursements',
          categoryId: 25,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 91,
          name: 'Expense Reimbursements',
          categoryId: 25,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 92,
          name: 'Educational Scholarships',
          categoryId: 26,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 93,
          name: 'Research Grants',
          categoryId: 26,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 94,
          name: 'Fellowships',
          categoryId: 26,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 95,
          name: 'Lottery Winnings',
          categoryId: 27,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 96,
          name: 'Gambling Winnings',
          categoryId: 27,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 97,
          name: 'Settlement Payments',
          categoryId: 27,
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
    return queryInterface.bulkDelete('SubCategories', null, {});
  },
};
