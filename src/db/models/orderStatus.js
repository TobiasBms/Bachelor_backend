const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderStatus", {
    name: DataTypes.STRING,
    color: DataTypes.CHAR(6),
    completed: DataTypes.BOOLEAN,
  })
}
