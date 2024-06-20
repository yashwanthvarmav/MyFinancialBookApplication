'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'phoneNumber', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Users', 'dateOfBirth', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING(2000)
    });
    await queryInterface.addColumn('Users', 'country', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Users', 'pinCode', {
      type: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'phoneNumber');
    await queryInterface.removeColumn('Users', 'dateOfBirth');
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.removeColumn('Users', 'country');
    await queryInterface.removeColumn('Users', 'pinCode');
  }
};
