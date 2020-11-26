const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("Order", {
    restaurantId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: "id",
      },
    },
    seatId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.RestaurantSeat,
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    comment: DataTypes.STRING,
  })
}
