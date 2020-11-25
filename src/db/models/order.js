const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("Order", {
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: "id",
      },
    },
    seat_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.RestaurantSeat,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    comment: DataTypes.STRING,
  })
}
