const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant, RestaurantSeat } = sequelize.models
  sequelize.define("Order", {
    restaurant_id: {
      type: DataTypes.INTEGER,
      references: { model: Restaurant },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    seat_id: {
      type: DataTypes.INTEGER,
      references: { model: RestaurantSeat },
      onDelete: "SET NULL",
      onUpdate: "RESTRICT",
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
