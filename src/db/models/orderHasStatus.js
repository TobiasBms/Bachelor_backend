const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { Order, OrderStatus } = sequelize.models
  sequelize.define("OrderHasStatus", {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Order },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    statusId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: OrderStatus },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    },
    timeChanged: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  })
}
