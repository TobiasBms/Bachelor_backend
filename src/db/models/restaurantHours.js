const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('RestaurantHours', {
    restaurant_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      references: {
        model: sequelize.models.Restaurant,
        key: 'id',
      },
    },
    day_of_week: {
      type: DataTypes.ENUM({
        values: [
          'Default',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
      }),
      primaryKey: true,
    },
    open_hour: {
      type: DataTypes.TIME,
    },
    close_hour: {
      type: DataTypes.TIME,
    },
  })
}
