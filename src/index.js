const express = require("express");
const db = require("../lib/config/database");
require("dotenv").config();
const Restaurant = require('../lib/config/models/Restaurant');


const app = express();

app.use(function(req,res,next){
    db();
    next();
});

app.get("/", (req,res) => {
    res.end("Hello world");
})

const port = process.env.PORT;



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
