const { Product } = require("../db").models

module.exports = { getAll, getById, create, update, remove }

async function getAll(scopes = []) {
  return await Product.scope(scopes).findAll()
}

async function getById(id, scopes = []) {
  return await Product.scope(scopes).findByPk(id)
}

async function create(body) {
  return await Product.create(body)
}

async function update(id, body) {
  await Product.update(body, { where: { id } })
}

async function remove(id) {
  await Product.destroy({ where: { id } })
}
