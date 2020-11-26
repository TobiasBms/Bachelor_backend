const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { Order, OrderStatus } = sequelize.models
  sequelize.define("OrderHasStatus", {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Order },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: OrderStatus },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },
    time_changed: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  })
}
