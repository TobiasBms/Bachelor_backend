module.exports = function applyScopes(sequelize) {
  const { Manager, ManagerRole, Privilege } = sequelize.models

  // Include manager role
  Manager.addScope("role", {
    include: [
      {
        model: ManagerRole,
        as: "role",
        // We don't need restaurant ID as it exists on manager
        attributes: { exclude: ["restaurant_id"] },
      },
    ],
    // Exclude role ID on manager as it's included in role object
    attributes: { exclude: ["role_id"] },
  })

  // Include extended privileges
  Manager.addScope("privileges", {
    include: [
      {
        model: Privilege,
        as: "privileges",
        // Avoid adding join table as child of privilege objects
        through: { attributes: [] },
      },
    ],
  })
}
