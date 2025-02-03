const express = require('express');

const port = 9090;

const app = express();

const db = require('./config/db');

const path = require('path');

app.set("view engine", "ejs");

const bookModel = require("./models/bookModel");

app.use(express.urlencoded());

const multer = require('multer');

//file upload start
const fs = require('fs');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        let uniq = Math.floor(Math.random() * 10000000);
        cb(null, `${file.fieldname}-${uniq}`);
    }
})
const imageUpload = multer({ storage: st }).single('image');
//file upload end

app.get('/', (req, res) => {
    return res.render('Add')
})


// Add Record
app.post('/addRecord', (req, res) => {
    const { name, price, pages, description, author } = req.body;
    if (!req.file) {
        return res.status(400).send("Please upload an image.");
    }
    bookModel.create({
        bookName: name,
        bookPrice: price,
        bookPages: pages,
        bookDescription: description,
        bookAuthor: author,
        bookImage: req.file?.path
    }).then((record) => {
        console.log(record);
        console.log("Record added successfully..!");
        return res.redirect('/viewRecord');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})



app.get('/viewRecord', (req, res) => {
    bookModel.find()
        .then((record) => {
            return res.render('view', {
                record
            })
        })
})


app.get('/deleteRecord', (req, res) => {
    const id = req.query.delId;
    bookModel.findById(id)
        .then((singlerow) => {
            if (singlerow?.bookImage) {
                try {
                    fs.unlinkSync(singlerow.bookImage);
                } catch (err) {
                    console.log("Error deleting the file: ", err);
                }
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });

    bookModel.findByIdAndDelete(id)
        .then(() => {
            return res.redirect('/viewRecord');
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Error in deleting record.");
        });
});
    

app.get('/editRecord', (req, res) => {
    let id = req.query.editId;
    bookModel.findById(id)
        .then((single) => {
            return res.render('edit', {
                single
            });

        }).catch((err) => {
            console.log(err);
            return false;
        })
})


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