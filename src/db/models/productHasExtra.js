const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("ProductHasExtra", {
    productId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Product,
        key: "id",
      },
    },
    extraId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Extra,
        key: "id",
      },
    },
  })
}
