const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("Extra", {
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        foreignKey: "id",
      },
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    hidden: DataTypes.BOOLEAN,
    sold_out: DataTypes.BOOLEAN,
  })
}
