const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("ProductHasCategory", {
    product_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Product,
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.NUMBER,
      references: {
        models: sequelize.models.ProductCategory,
        key: "id",
      },
    },
  })
}
