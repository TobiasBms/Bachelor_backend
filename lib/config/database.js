require("dotenv").config();
const RestaurantModel = require('../models/Restaurant')
const { Sequelize } = require('sequelize');

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
        
    }catch(e){
        throw new Error(e.message);
    }
    
}
module.exports = {db, sequelize};
