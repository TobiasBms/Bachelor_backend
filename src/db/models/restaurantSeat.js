const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("RestaurantSeat", {
    restaurantId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: "id",
      },
    },
    name: DataTypes.STRING,
  })
}
