const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant } = sequelize.models
  sequelize.define("RestaurantHours", {
    restaurantId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Restaurant },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
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
      defaultValue: "10:00",
      allowNull: false,
    },
    closeHour: {
      type: DataTypes.TIME,
      defaultValue: "22:00",
      allowNull: false,
    },
  })
}
