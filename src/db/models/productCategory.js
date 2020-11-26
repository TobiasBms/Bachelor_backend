const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("ProductCategory", {
    restaurantId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: "id",
      },
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    hidden: DataTypes.BOOLEAN,
    availableStart: DataTypes.TIME,
    availableEnd: DataTypes.TIME,
  })
}
