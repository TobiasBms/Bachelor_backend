const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  const { Extra, OrderHasProduct } = sequelize.models
  sequelize.define("OrderHasProductHasExtra", {
    extraId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: Extra },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    orderproductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: OrderHasProduct },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    },
    amount: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: false,
    },
  })
}
