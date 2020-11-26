const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Product, ProductCategory } = sequelize.models
  sequelize.define("ProductHasCategory", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Product },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { models: ProductCategory },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
  })
}
