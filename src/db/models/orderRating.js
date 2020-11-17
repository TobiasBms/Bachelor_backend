const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('OrderRating', {
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: 'id',
      },
    },
    order_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Order,
        key: 'id',
      },
    },
    name: DataTypes.STRING,
    rating: DataTypes.TINYINT,
    review: DataTypes.TEXT,
    rated_at: DataTypes.TIME,
  })
}
