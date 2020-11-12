const fs = require('fs');

function loadFiles(){
	try{
		return fs.readdirSync('./src/db/models')
					.filter(file => file !== 'index.js')
					.map(file => require(`./${file}`));
	}catch(error){
		console.error(error.messsage);
	}
}

module.exports = loadFiles();