const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Product, ProductCategory } = sequelize.models
  sequelize.define("ProductHasCategory", {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Product },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { models: ProductCategory },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
  })
}
