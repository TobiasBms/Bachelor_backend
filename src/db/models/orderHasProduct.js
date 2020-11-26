const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Order, Product } = sequelize.models
  sequelize.define("OrderHasProduct", {
    order_id: {
      type: DataTypes.INTEGER,
      references: { model: Order },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: { model: Product },
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    amount: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: false,
    },
  })
}
