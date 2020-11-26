const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("RestaurantCategory", {
    image_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  })
}
