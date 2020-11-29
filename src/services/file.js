const { File, RestaurantHasFile } = require("../db").models

module.exports = { getAll, create }

async function getAll(restaurantId) {
  return await RestaurantHasFile.findAll({ where: { restaurantId } })
}

async function create(restaurantId, multipartBody) {
  const fileData = multipartBody.file
  const file = await File.create({ name: fileData.name, hash: "test" })
  await RestaurantHasFile.create({ restaurantId, fileId: file.id })
  return file
}
