const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('Privilege', {
    name: {
      type: DataTypes.STRING,
    },
  })
}
