const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("ProductCategory", {
    restaurant_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Restaurant,
        key: "id",
      },
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    hidden: DataTypes.BOOLEAN,
    available_start: DataTypes.TIME,
    available_end: DataTypes.TIME,
  })
}
