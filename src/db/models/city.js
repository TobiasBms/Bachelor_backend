const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("City", {
    zip_code: {
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.CHAR(4),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
}
