const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("RestaurantHours", {
    restaurantId: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      references: {
        model: sequelize.models.Restaurant,
        key: "id",
      },
    },
    dayOfWeek: {
      type: DataTypes.ENUM({
        values: [
          "Default",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      }),
      primaryKey: true,
    },
    openHour: {
      type: DataTypes.TIME,
    },
    closeHour: {
      type: DataTypes.TIME,
    },
  })
}
