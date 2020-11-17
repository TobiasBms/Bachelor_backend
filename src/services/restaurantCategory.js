const { RestaurantCategory } = require('../db').models

module.exports = { getAll, getById }

async function getAll(scopes = []) {
  return await RestaurantCategory.scope(scopes).findAll()
}

async function getById(id, scopes = []) {
  return await RestaurantCategory.scope(scopes).findByPk(id)
}
