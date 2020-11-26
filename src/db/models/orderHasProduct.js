const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderHasProduct", {
    order_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Order,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Product,
        key: "id",
      },
    },
    amount: DataTypes.TINYINT,
  })
}
