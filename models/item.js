'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Service, { foreignKey: 'serviceId' })
      Item.belongsToMany(models.Reservation, {
        through: models.Order,
        foreignKey: 'itemId',
        as: 'ReservedItems'
      })
    }
  }
  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'Items',
    underscored: true,
  });
  return Item;
};