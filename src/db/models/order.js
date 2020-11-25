const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant, RestaurantSeat } = sequelize.models
  sequelize.define("Order", {
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: { model: Restaurant, key: "id" },
      allowNull: false,
    },
    seat_id: {
      type: DataTypes.NUMBER,
      references: { model: RestaurantSeat, key: "id" },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
  })
}
