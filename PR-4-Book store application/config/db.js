const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Book_Store_Application');

const db = mongoose.connection;

db.on("connected", (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Database Connected successfully..!");

})

module.exports = db;