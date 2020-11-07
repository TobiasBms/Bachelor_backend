const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('RestaurantHasCategory', {
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: 'restaurant_id'
      }
    },
    category_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.RestaurantCategory,
        key: 'id'
      }
    }
  });
}