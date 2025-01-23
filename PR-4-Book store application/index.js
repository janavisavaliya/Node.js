const express = require('express');

const port = 9090;

const app = express();

const db = require('./config/db');

const path = require('path');// To get file path

app.set("view engine", "ejs");//

const bookModel = require("./models/detailsModel");

app.use(express.urlencoded());// To get form data

app.get('/', (req, res) => {
    return res.render('Add')
})


// Add Record
app.post('/addRecord', (req, res) => {
    const { name, price, pages, description, author } = req.body;

    bookModel.create({
        bookName: name,
        bookPrice: price,
        bookPages: pages,
        bookDescription: description,
        bookAuthor: author
    }).then((record) => {
        console.log(record);
        console.log("Record added successfully..!");
        return res.redirect('/viewRecord');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})


// View Record
app.get('/viewRecord', (req, res) => {
    bookModel.find()
        .then((record) => {
            return res.render('view', {
                record
            })
        })
})


// Delete Record
app.get('/deleteRecord', (req, res) => {
    const id = req.query.delId;

    bookModel.findByIdAndDelete(id)
        .then((del) => {
            console.log(del);
            return res.redirect('/viewRecord');
        }).catch((err) => {
            console.log(err);
            return false;
        })
})


// Edit Record
app.get('/editRecord', (req, res) => {
    bookModel.findById(req.query.editId)
        .then((edit) => {
            return res.render('edit', {
                edit
            })
        })
})


// Update Record
app.post('/updateRecord', (req, res) => {
    const { editId, name, price, pages, description, author } = req.body;

    bookModel.findByIdAndUpdate(editId, {
        bookName: name,
        bookPrice: price,
        bookPages: pages,
        bookDescription: description,
        bookAuthor: author
    }).then((edit) => {
        console.log(edit);
        return res.redirect('/viewRecord');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})


// Server Start
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port :- ${port}`);
})