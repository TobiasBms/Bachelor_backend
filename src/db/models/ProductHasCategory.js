const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("ProductHasCategory", {
    productId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Product,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.NUMBER,
      references: {
        models: sequelize.models.ProductCategory,
        key: "id",
      },
    },
  })
}
