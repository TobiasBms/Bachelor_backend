const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Extra, OrderHasProduct } = sequelize.models
  sequelize.define("OrderHasProductHasExtra", {
    extra_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      references: { model: Extra, key: "id" },
    },
    orderproduct_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      references: { model: OrderHasProduct, key: "id" },
    },
    amount: {
      type: DataTypes.TINYINT,
    },
  })
}
