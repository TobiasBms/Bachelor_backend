const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("OrderStatus", {
    name: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.CHAR(6),
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  })
}
