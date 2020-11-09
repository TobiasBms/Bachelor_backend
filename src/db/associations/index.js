function applyAssociations(sequelize) {
  const associations = [
    require('./restaurant'),
    require('./manager'),
  ]

  for (const apply of associations) {
    apply(sequelize)
  }
}

module.exports = { applyAssociations }