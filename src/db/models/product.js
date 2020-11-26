const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("Product", {
    restaurantId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: "id",
      },
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageId: DataTypes.NUMBER,
    price: DataTypes.DECIMAL,
    soldOut: DataTypes.BOOLEAN,
    hidden: DataTypes.BOOLEAN,
  })
}
