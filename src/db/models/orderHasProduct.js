const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Order, Product } = sequelize.models
  sequelize.define("OrderHasProduct", {
    order_id: {
      type: DataTypes.NUMBER,
      references: { model: Order, key: "id" },
      allowNull: false,
    },
    product_id: {
      type: DataTypes.NUMBER,
      references: { model: Product, key: "id" },
      allowNull: false,
    },
    amount: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: false,
    },
  })
}
