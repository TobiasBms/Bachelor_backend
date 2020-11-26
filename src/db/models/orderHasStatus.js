const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Order, OrderStatus } = sequelize.models
  sequelize.define("OrderHasStatus", {
    order_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: { model: Order, key: "id" },
    },
    status_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: { model: OrderStatus, key: "id" },
    },
    time_changed: {
      type: DataTypes.DATE,
    },
  })
}
