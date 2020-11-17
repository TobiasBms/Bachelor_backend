module.exports = function applyScopes(sequelize) {
  const { Manager, ManagerRole } = sequelize.models

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
}
