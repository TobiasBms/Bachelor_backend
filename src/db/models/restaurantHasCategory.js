const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("RestaurantHasCategory", {
    restaurantId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: "restaurant_id",
      },
    },
    categoryId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.RestaurantCategory,
        key: "id",
      },
    },
  })
}
