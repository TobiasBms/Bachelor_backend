const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderStatus", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.CHAR(6),
      allowNull: false,
    },
  })
}
