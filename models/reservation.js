'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservation.belongsTo(models.User, { foreignKey: 'userId' }),
      Reservation.belongsToMany(models.Item, {
        through: models.Order,
        foreignKey: 'reservationId',
        as: 'ReservedDetails'
      })
    }
  }
  Reservation.init({
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
    tableName: 'Reservations',
    underscored: true,
  });
  return Reservation;
};