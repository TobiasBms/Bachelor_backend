const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("Extra", {
    restaurantId: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      references: {
        model: sequelize.models.Restaurant,
        foreignKey: "id",
      },
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    hidden: DataTypes.BOOLEAN,
    soldOut: DataTypes.BOOLEAN,
  })
}
