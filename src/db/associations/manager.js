module.exports = function applyAssociations(sequelize) {
  const {
    Restaurant,
    Manager,
    ManagerRole,
    Privilege,
    ManagerHasPrivilege,
    RoleHasPrivilege,
  } = sequelize.models

  Restaurant.hasMany(Manager, {
    foreignKey: "restaurant_id",
  })

  Manager.belongsTo(Restaurant, {
    foreignKey: "restaurant_id",
  })

  Restaurant.hasMany(ManagerRole, {
    foreignKey: "restaurant_id",
  })

  ManagerRole.belongsTo(Restaurant, {
    foreignKey: "restaurant_id",
  })

  ManagerRole.hasMany(Manager, {
    foreignKey: "role_id",
  })

  Manager.belongsTo(ManagerRole, {
    foreignKey: "role_id",
    as: "role",
  })

  Privilege.belongsToMany(Manager, {
    through: ManagerHasPrivilege,
    foreignKey: "privilege_id",
    otherKey: "manager_id",
    as: "manager",
  })

  Manager.belongsToMany(Privilege, {
    through: ManagerHasPrivilege,
    foreignKey: "manager_id",
    otherKey: "privilege_id",
    as: "manager",
  })

  ManagerRole.belongsToMany(Privilege, {
    through: RoleHasPrivilege,
    foreignKey: "role_id",
    otherKey: "privilege_id",
    as: "privileges",
  })

  Privilege.belongsToMany(ManagerRole, {
    through: RoleHasPrivilege,
    foreignKey: "privilege_id",
    otherKey: "role_id",
    as: "privileges",
  })
}
