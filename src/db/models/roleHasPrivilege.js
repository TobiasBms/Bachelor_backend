const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('RoleHasPrivilege', {
    role_id: {
      type: DataTypes.NUMBER,
      references: {
        model: sequelize.models.ManagerRole,
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
