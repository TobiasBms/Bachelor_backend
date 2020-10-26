require("dotenv").config();
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASS, {
    host: process.env.HOST,
    dialect: 'mysql',
    pool:{
        max: 3,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  });

async function db(){

    try{
        await sequelize.authenticate();
    }catch(e){
        console.error(e.message);
    }

}

module.exports = db;
