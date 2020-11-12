const fs = require('fs');

function applyAssociations(sequelize) {
  
  /*
    Dynamic import and apply the functions from associations
  */
 
   fs.readdirSync('./src/db/associations')
  .filter(file => file !== 'index.js')
  .map(file => require(`./${file}`))
  .forEach(applyFile => applyFile(sequelize));

}

module.exports = { applyAssociations };