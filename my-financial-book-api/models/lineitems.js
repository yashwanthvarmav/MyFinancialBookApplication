'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LineItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LineItems.belongsTo(models.SubCategory, {
        foreignKey: 'subCategoryId'
      })
    }
  }
  LineItems.init({
    name: DataTypes.STRING,
    subCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LineItems',
  });
  return LineItems;
};