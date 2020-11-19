const { Order } = require("../db").models

module.exports = { getAll, getById, create, update, remove }

async function getAll(scopes) {
  return await Order.scope(scopes).findAll()
}

async function getById(id, scopes) {
  return await Order.scope(scopes).getById(id)
}

async function create(body) {
  return await Order.create(body)
}

async function update(id, body) {
  await Order.update(body, { where: { id } })
}

async function remove(id) {
  await Order.destroy({ where: { id } })
}
