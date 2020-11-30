const { Extra, ProductHasExtra } = require("../db").models

module.exports = { getAll, getById, create, update, remove, addToProduct }

async function getAll(scopes = []) {
  return await Extra.scope(scopes).findAll()
}

async function getById(id, scopes = []) {
  return await Extra.scope(scopes).findByPk(id)
}

async function create(body) {
  await Extra.create(body)
}
async function update(id, body) {
  return await Extra.update(body, { where: { id } })
}

async function addToProduct(extraId, productId) {
  return await ProductHasExtra.create({ extraId, productId })
}

async function remove(id) {
  return await Extra.destroy({ where: { id } })
}
