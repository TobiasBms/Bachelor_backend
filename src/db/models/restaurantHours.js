const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant } = sequelize.models
  sequelize.define("RestaurantHours", {
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Restaurant, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    day_of_week: {
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
    open_hour: {
      type: DataTypes.TIME,
      defaultValue: "10:00",
      allowNull: false,
    },
    close_hour: {
      type: DataTypes.TIME,
      defaultValue: "22:00",
      allowNull: false,
    },
  })
}
