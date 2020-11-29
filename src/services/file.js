const { File, RestaurantHasFile } = require("../db").models
const fs = require("fs").promises
const crypto = require("crypto")
require("dotenv").config()

const allowedFiles = ["image/jpeg", "image/png", "image/gif"]

module.exports = { getAll, create }

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

function getHash(filename) {
  const withDate = filename + Date.now()
  return crypto.createHash("md5").update(withDate).digest("hex")
}

async function getFileLocation(hash) {
  let destination = process.env.UPLOAD_DIR
  destination += `${hash.split("", 4).join("/")}/`
  await fs.mkdir(destination, { recursive: true })
  destination += `${hash.slice(4)}`
  return destination
}
