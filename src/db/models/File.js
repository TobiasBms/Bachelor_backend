const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("File", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
}
