const express = require("express");
const db = require("../lib/config/database");
require("dotenv").config();
const app = express();


app.use(function(req,res,next){
    db();
    next();
});
const port = process.env.PORT;



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
