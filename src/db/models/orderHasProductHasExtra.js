const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderHasProductHasExtra", {
    extra_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      references: {
        model: sequelize.models.Extra,
        key: "id",
      },
    },
    orderproduct_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      references: {
        model: sequelize.models.OrderHasProduct,
        key: "id",
      },
    },
    amount: DataTypes.TINYINT,
  })
}
