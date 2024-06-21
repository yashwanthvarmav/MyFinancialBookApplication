'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavingsAndInvestments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SavingsAndInvestments.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      SavingsAndInvestments.belongsTo(models.SubCategory, {
        foreignKey: 'subCategoryId'
      })
    }
  }
  SavingsAndInvestments.init({
    userId: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    subCategoryId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    investmentStartedDate: DataTypes.DATE,
    lockInPeriod: {
      type: DataTypes.STRING,
      get() {
        const value = this.getDataValue('lockInPeriod');
        return parseFloat(value).toFixed(2);
      }
    },
    dateOfMaturity: DataTypes.DATE,
    maturityAmount: DataTypes.INTEGER,
    nextPaymentDate: DataTypes.DATE,
  }, 
  {
    hooks: {
      beforeSave: (savingsAndInvestments, options) => {
        savingsAndInvestments.lockInPeriod = parseFloat(savingsAndInvestments.lockInPeriod).toString();
      }
    },
    sequelize,
    modelName: 'SavingsAndInvestments',
  });
  return SavingsAndInvestments;
};