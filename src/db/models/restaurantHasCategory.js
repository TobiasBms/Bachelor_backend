const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant, RestaurantCategory } = sequelize.models
  sequelize.define("RestaurantHasCategory", {
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Restaurant },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: RestaurantCategory },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
  })
}
