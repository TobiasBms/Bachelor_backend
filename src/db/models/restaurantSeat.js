const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant } = sequelize.models
  sequelize.define("RestaurantSeat", {
    restaurant_id: {
      type: DataTypes.INTEGER,
      references: { model: Restaurant },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
}
