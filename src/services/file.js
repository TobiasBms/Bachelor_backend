const { File, RestaurantHasFile } = require("../db").models
const fs = require("fs").promises
const { getFileLocation, allowedFiles } = require("../utils/file")
require("dotenv").config()

module.exports = { getAll, getById, create, remove }

async function getAll(restaurantId) {
  return await File.findAll({
    include: [
      {
        model: RestaurantHasFile,
        as: "data",
        attributes: [],
        where: { restaurantId },
      },
    ],
  })
}

async function getById(id) {
  return await File.findByPk(id, {
    include: [
      {
        model: RestaurantHasFile,
        as: "data",
        attributes: { exclude: ["fileId"] },
        where: { fileId: id },
      },
    ],
  })
}

async function create(restaurantId, multipartBody) {
  const fileData = multipartBody.file
  if (!allowedFiles.includes(fileData.type)) {
    throw new Error("Filetype is not allowed")
  }

  /* Hash filename and store in filesystem */
  const location = await getFileLocation(fileData.name, { create: true })
  await fs.rename(fileData.path, location)

  /* Save file info to database */
  const file = await File.create({ name: fileData.name, location })
  await RestaurantHasFile.create({ restaurantId, fileId: file.id })
  return file
}

/**
 * Removes an uploaded file from the system, if it belongs to given restaurant.
 */
async function remove(restaurantId, id) {
  /* Check if file belongs to current restaurant */
  const file = await getById(id)
  if (file.data.restaurantId !== restaurantId) {
    throw new Error("Unauthorized access")
  }

  /* Remove from file system and database */
  await fs.unlink(file.location)
  await File.destroy({ where: { id } })
}
