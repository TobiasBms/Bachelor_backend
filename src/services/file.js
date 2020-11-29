const { File, RestaurantHasFile } = require("../db").models
const fs = require("fs").promises
const crypto = require("crypto")
require("dotenv").config()

const allowedFiles = ["image/jpeg", "image/png", "image/gif"]

module.exports = { getAll, getById, create, remove }

async function getAll(restaurantId) {
  return await File.findAll({
    include: [
      {
        model: RestaurantHasFile,
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
  const hash = getHash(fileData.name)
  const destination = await getFileLocation(hash)
  const extension = fileData.name.split(".").pop()
  await fs.rename(fileData.path, `${destination}.${extension}`)

  /* Save file info to database */
  const file = await File.create({ name: fileData.name, hash })
  await RestaurantHasFile.create({ restaurantId, fileId: file.id })
  return file
}

async function remove(id) {
  const file = await File.findByPk(id)
  const location = await getFileLocation(file.hash)
  const extension = file.name.split(".").pop()
  await fs.unlink(`${location}.${extension}`)
  await File.destroy({ where: { id } })
}

/**
 * Appends a timestamp to a filename and computes a hash of the result. Files
 * will be stored in the filesystem under this name instead of the uploaded
 * name, making conflicts near impossible.
 * @param {string} filename Filename of an uploaded file
 */
function getHash(filename) {
  const withDate = filename + Date.now()
  return crypto.createHash("md5").update(withDate).digest("hex")
}

/**
 * Generates a file location based on a hashed filename. The first four
 * characters are each converted into a new level in the folder structure,
 * resulting in a hierarchy with a max of 16 (hexadecimal) sub-folders in
 * each folder. This minimizes the amount of files in each folder.
 * @param {string} hash A hashed filename
 */
async function getFileLocation(hash) {
  let destination = process.env.UPLOAD_DIR
  destination += `${hash.split("", 4).join("/")}/`
  await fs.mkdir(destination, { recursive: true })
  destination += `${hash.slice(4)}`
  return destination
}
