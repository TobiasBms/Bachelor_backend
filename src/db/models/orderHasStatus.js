const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderHasStatus", {
    orderId: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Order,
        key: "id",
      },
    },
    statusId: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.OrderStatus,
        key: "id",
      },
    },
    timeChanged: DataTypes.DATE,
  })
}
