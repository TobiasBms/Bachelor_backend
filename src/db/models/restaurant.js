const { DataTypes } = require("sequelize")

module.exports = sequelize => {
  sequelize.define("Restaurant", {
    name: DataTypes.STRING,
    zipCode: {
      type: DataTypes.CHAR,
      references: {
        model: sequelize.models.City,
        key: "zip_code",
      },
    },
    address: DataTypes.STRING,
    registeredAt: DataTypes.DATE,
    location: DataTypes.GEOGRAPHY,
    phone: DataTypes.CHAR,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    logoId: DataTypes.NUMBER,
    bannerId: DataTypes.NUMBER,
    description: DataTypes.TEXT,
    smileyId: DataTypes.NUMBER,
  })
}
