const { models } = require('../db')

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}

async function getAll() {
  return await models.Restaurant.findAll()
}

async function getById(id) {
  return await models.Restaurant.findByPk(id)
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
