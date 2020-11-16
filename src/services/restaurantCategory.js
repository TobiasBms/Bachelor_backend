const { models } = require('../db')

module.exports = {
  getAll,
  getById,
}

async function getAll(scopes = []) {
  return await models.RestaurantCategory.scope(scopes).findAll()
}

async function getById(id, scopes = []) {
  return await models.RestaurantCategory.scope(scopes).findByPk(id)
}
