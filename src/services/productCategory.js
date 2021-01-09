const { ProductCategory } = require("../db").models

module.exports = { getAll, getById, create, update, remove }

async function getAll(scopes = [], restaurantid) {
  return await ProductCategory.scope(scopes).findAll({
    where: {
      restaurantId: restaurantid,
    },
  })
}

async function getById(id, scopes = []) {
  return await ProductCategory.scope(scopes).findByPk(id)
}

async function create(body) {
  await ProductCategory.create(body)
}
async function update(id, body) {
  return await ProductCategory.update(body, { where: { id } })
}

async function remove(id) {
  return await ProductCategory.destroy({ where: { id } })
}
