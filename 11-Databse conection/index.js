const express = require("express");
const port = 8005;
const db = require('./config/db');
const app = express();

app.get('/',(req,res)=>{
    res.write('<h1>hello world</h1>');
    res.end();
})
app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server start on post ${port}`);
    
})