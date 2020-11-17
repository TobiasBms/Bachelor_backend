const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('Order', {
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: 'id',
      },
    },
    seat_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.RestaurantSeat,
        key: 'id',
      },
    },
    created_at: DataTypes.DATE,
    comment: DataTypes.STRING,
  })
}
