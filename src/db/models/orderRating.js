const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderRating", {
    restaurantId: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: "id",
      },
    },
    orderId: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Order,
        key: "id",
      },
    },
    name: DataTypes.STRING,
    rating: DataTypes.TINYINT,
    review: DataTypes.TEXT,
    ratedIt: DataTypes.TIME,
  })
}
