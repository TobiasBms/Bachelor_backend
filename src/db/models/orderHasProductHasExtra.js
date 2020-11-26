const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderHasProductHasExtra", {
    extraId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Extra,
        key: "id",
      },
    },
    orderproductId: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.OrderHasProduct,
        key: "id",
      },
    },
    amount: DataTypes.TINYINT,
  })
}
