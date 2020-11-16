const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('ManagerHasPrivilege', {
    manager_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Manager,
        key: 'id',
      },
    },
    privilege_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.Privilege,
        key: 'id',
      },
    },
  })
}
