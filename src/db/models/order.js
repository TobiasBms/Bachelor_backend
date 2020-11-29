const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant, RestaurantSeat } = sequelize.models
  sequelize.define("Order", {
    restaurantId: {
      type: DataTypes.INTEGER,
      references: { model: Restaurant },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    seatId: {
      type: DataTypes.INTEGER,
      references: { model: RestaurantSeat },
      onDelete: "SET NULL",
      onUpdate: "RESTRICT",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
  })
}
