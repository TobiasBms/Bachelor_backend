const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("City", {
    zipCode: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.CHAR,
    },
    name: DataTypes.STRING,
  })
}
