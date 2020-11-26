const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderHasProduct", {
    orderId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Order,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Product,
        key: "id",
      },
    },
  })
}
