const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Product, Extra } = sequelize.models
  sequelize.define("ProductHasExtra", {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Product },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    extraId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Extra },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
  })
}
