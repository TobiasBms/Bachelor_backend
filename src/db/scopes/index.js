const fs = require('fs')

/* Dynamically import and apply scopes */
function applyScopes(sequelize) {
  fs.readdirSync('./src/db/scopes')
    .filter(file => file !== 'index.js')
    .map(file => require(`./${file}`))
    .forEach(applyFile => applyFile(sequelize))
}

module.exports = { applyScopes }
