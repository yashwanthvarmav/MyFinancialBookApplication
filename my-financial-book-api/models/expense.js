'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expense.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Expense.belongsTo(models.SubCategory, {
        foreignKey: 'subCategoryId'
      })
    }
  }
  Expense.init({
    userId: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    subCategoryId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};