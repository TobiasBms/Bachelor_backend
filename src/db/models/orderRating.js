const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { Order, Restaurant } = sequelize.models
  sequelize.define("OrderRating", {
    order_id: {
      type: DataTypes.NUMBER,
      references: { model: Order, key: "id" },
      unique: true,
    },
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: { model: Restaurant, key: "id" },
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
    },
    rated_at: {
      type: DataTypes.TIME,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  })
}
