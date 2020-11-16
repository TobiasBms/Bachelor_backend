const fs = require('fs')

function loadFiles() {
  return fs
    .readdirSync('./src/db/models')
    .filter(file => file !== 'index.js')
    .map(file => require(`./${file}`))
}

module.exports = loadFiles()
