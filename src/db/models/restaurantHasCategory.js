const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant, RestaurantCategory } = sequelize.models
  sequelize.define("RestaurantHasCategory", {
    restaurantId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Restaurant },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: RestaurantCategory },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
  })
}
