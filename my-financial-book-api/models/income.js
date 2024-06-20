'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incomes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Incomes.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Incomes.belongsTo(models.SubCategory, {
        foreignKey: 'subCategoryId'
      })
    }
  }
  Incomes.init({
    userId: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    subCategoryId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Incomes',
  });
  return Incomes;
};