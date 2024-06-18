'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Services.belongsTo(models.User, {
        foreignKey: 'userId'
      }),
      Services.belongsTo(models.LineItems, {
        foreignKey: 'lineItemId'
      })
    }
  }
  Services.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    lineItemId: DataTypes.INTEGER,
    servicedDate: DataTypes.DATE,
    servicedBy: DataTypes.STRING,
    servicedContactNumber: DataTypes.STRING,
    servicedVendor: DataTypes.STRING,
    nextServiceDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Services',
  });
  return Services;
};