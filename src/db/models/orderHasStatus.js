const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderHasStatus", {
    order_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Order,
        key: "id",
      },
    },
    status_id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.OrderStatus,
        key: "id",
      },
    },
    time_changed: DataTypes.DATE,
  })
}
