'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.hasMany(models.Item, { foreignKey: 'serviceId' })
    }
  }
  Service.init({
    name: DataTypes.STRING,
    introduction: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Service',
    tableName: 'Services',
    underscored: true,
  });
  return Service;
};