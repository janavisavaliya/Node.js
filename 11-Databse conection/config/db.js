const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/mydatabase`);
const db = mongoose.connection;

db.on("connected",(err)=>{
    if(err){
        console.log(err);
        }
        console.log("database succesfully connected");
})
module.exports = db;