'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SavingsAndInvestments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      Title: {
        type: Sequelize.STRING
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SubCategories',
          key: 'id'
        }
      },
      description: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      investmentStartedDate: {
        type: Sequelize.DATE
      },
      lockInPeriod: {
        type: Sequelize.STRING
      },
      dateOfMaturity: {
        type: Sequelize.DATE
      },
      maturityAmount: {
        type: Sequelize.INTEGER
      },
      nextPaymentDate: {
        type: Sequelize. DATE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SavingsAndInvestments');
  }
};