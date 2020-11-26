const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Product, Extra } = sequelize.models
  sequelize.define("ProductHasExtra", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Product },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    extra_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Extra },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
  })
}
