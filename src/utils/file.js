const fs = require("fs").promises
const crypto = require("crypto")

/**
 * List of allowed file types for user uploads.
 */
const allowedFiles = ["image/jpeg", "image/png", "image/gif"]

module.exports = { getHash, getFileLocation, allowedFiles }

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
