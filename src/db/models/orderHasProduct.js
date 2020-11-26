const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Order, Product } = sequelize.models
  sequelize.define("OrderHasProduct", {
    order_id: {
      type: DataTypes.NUMBER,
      references: { model: Order, key: "id" },
    },
    product_id: {
      type: DataTypes.NUMBER,
      references: { model: Product, key: "id" },
    },
    amount: {
      type: DataTypes.TINYINT,
    },
  })
}
