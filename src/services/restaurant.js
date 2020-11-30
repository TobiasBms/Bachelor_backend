const { Restaurant, RestaurantHasCategory } = require("../db").models

module.exports = {
  getAll,
  getById,
  create,
  addToCategory,
  removeFromCategory,
  update,
  remove,
}

async function getAll(scopes = []) {
  return await Restaurant.scope(scopes).findAll()
}

async function getById(id, scopes = []) {
  return await Restaurant.scope(scopes).findByPk(id)
}

async function create(body) {
  return await Restaurant.create(body)
}

async function addToCategory(id, categoryId) {
  return await RestaurantHasCategory.create({ restaurantId: id, categoryId })
}

async function removeFromCategory(id, categoryId) {
  return await RestaurantHasCategory.destroy({
    where: { restaurantId: id, categoryId },
  })
}

async function update(id, body) {
  await Restaurant.update(body, { where: { id } })
}

async function remove(id) {
  await Restaurant.destroy({ where: { id } })
}
