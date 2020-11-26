const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant, Order } = sequelize.models
  sequelize.define("OrderRating", {
    restaurant_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: { model: Restaurant, key: "id" },
    },
    order_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: { model: Order, key: "id" },
    },
    name: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.TINYINT,
    },
    review: {
      type: DataTypes.TEXT,
    },
    rated_at: {
      type: DataTypes.TIME,
    },
  })
}
