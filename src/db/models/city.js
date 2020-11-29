const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("City", {
    zipCode: {
      type: DataTypes.CHAR(4),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
}
