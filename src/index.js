const express = require("express");
const app = express();
require("dotenv").config();
const {db} = require('../lib/config/database');
const restaurantRouteGroup = require('./routes/restaurant');

app.use(function(req,res,next){
    db();
    next();
});

app.use(express.json());

app.use("/api", restaurantRouteGroup); 

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
