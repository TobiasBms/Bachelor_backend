const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("RestaurantCategory", {
    imageId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  })
}
