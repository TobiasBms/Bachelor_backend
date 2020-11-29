const { DataTypes, Sequelize } = require("sequelize")

module.exports = sequelize => {
  const { City } = sequelize.models
  sequelize.define("Restaurant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      references: { model: City },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    registeredAt: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOMETRY("POINT"),
    },
    phone: {
      type: DataTypes.CHAR(8),
    },
    email: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    logoId: {
      type: DataTypes.INTEGER,
    },
    bannerId: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    smileyId: {
      type: DataTypes.INTEGER,
    },
  })
}
