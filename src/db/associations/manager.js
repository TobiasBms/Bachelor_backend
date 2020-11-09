function applyAssociations(sequelize) {
  const {
    Restaurant,
    Manager,
    ManagerRole
  } = sequelize.models;

  Restaurant.hasMany(Manager, {
    foreignKey: 'restaurant_id'
  })

  Manager.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id'
  })

  Restaurant.hasMany(ManagerRole, {
    foreignKey: 'restaurant_id'
  })

  ManagerRole.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id'
  })

  ManagerRole.hasMany(Manager, {
    foreignKey: 'role_id'
  })

  Manager.belongsTo(ManagerRole, {
    foreignKey: 'role_id',
    as: 'role'
  })
}

module.exports = applyAssociations;