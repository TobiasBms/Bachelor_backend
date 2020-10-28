require("dotenv").config();
const RestaurantModel = require('./models/Restaurant')
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASS, {
    host: process.env.HOST,
    dialect: 'mysql',
    pool:{
        max: 3,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: console.log,
  });


async function db(){
    try{
        await sequelize.authenticate();
        
        const Restaurant = RestaurantModel(sequelize, Sequelize);
        Restaurant.findOne().then(restaurant => console.log(restaurant))
         
    }catch(e){
        throw new Error(e.message);
    }

}

module.exports = sequelize;
module.exports = db;
