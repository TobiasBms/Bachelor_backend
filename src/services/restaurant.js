const { models } = require('../db')

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}

async function getAll(scopes = []) {
  return await models.Restaurant.scope(scopes).findAll()
}

async function getById(id, scopes = []) {
  return await models.Restaurant.scope(scopes).findByPk(id)
}

async function create(body) {
  return await models.Restaurant.create(body)
}

async function update(id, body) {
  await models.Restaurant.update(body, { where: { id } })
}

async function remove(id) {
  await models.Restaurant.destroy({ where: { id } })
}
