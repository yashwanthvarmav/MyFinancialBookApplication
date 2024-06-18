'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
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
      name: {
        type: Sequelize.STRING
      },
      lineItemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'LineItems',
          key: 'id'
        }
      },
      servicedDate: {
        type: Sequelize.DATE
      },
      servicedBy: {
        type: Sequelize.STRING
      },
      servicedContactNumber: {
        type: Sequelize.STRING
      },
      servicedVendor: {
        type: Sequelize.STRING
      },
      nextServiceDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Services');
  }
};