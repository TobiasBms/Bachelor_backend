const express = require("express");
const app = express();
require("dotenv").config();
const {db} = require('../lib/config/database');
const restaurantRouteGroup = require('./routes/restaurant');

app.use(function(req,res,next){

    //Establish the connection for the database
    db();
    next();
});

app.use(express.json());

app.use("/api", restaurantRouteGroup); 

const port = process.env.PORT;
const baseurl = process.env.BASEURL;

app.listen(port, () => { 
    console.log(`Example app listening at ${baseurl}:${port}`)
})

