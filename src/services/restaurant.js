const { Restaurant } = require('../db').models

module.exports = { getAll, getById, create, update, remove }

async function getAll(scopes = []) {
  return await Restaurant.scope(scopes).findAll()
}

async function getById(id, scopes = []) {
  return await Restaurant.scope(scopes).findByPk(id)
}

async function create(body) {
  return await Restaurant.create(body)
}

async function update(id, body) {
  await Restaurant.update(body, { where: { id } })
}

async function remove(id) {
  await Restaurant.destroy({ where: { id } })
}
