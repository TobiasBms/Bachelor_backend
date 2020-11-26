const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Restaurant, File } = sequelize.models
  sequelize.define("RestaurantHasFile", {
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Restaurant },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    file_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: File },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
  })
}
