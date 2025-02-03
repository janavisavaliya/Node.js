const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/db');

const path = require('path');

app.set('view engine', 'ejs');

const UserModel = require('./models/UserModel');

app.use(express.urlencoded());

app.get('/', (req, res) => {
    return res.render('form');
})

app.post('/adduser', (req, res) => {
    const { name, email, password } = req.body;
    UserModel.create({
        username: name,
        useremail: email,
        userpassword: password,
    }).then((record) => {
        console.log(record);
        console.log('User created successfully');
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;
    })
    res.redirect('/viewuser');
})

app.get('/viewuser', (req, res) => {
    UserModel.find({})
        .then((record) => {
            return res.render('table', {
                allrecord: record
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})


app.get('/deleteuser', (req, res) => {
    let id = req.query.did;
    UserModel.findByIdAndDelete(id)
        .then((data) => {
            console.log('record delete');
            return res.redirect('/viewuser');
        }).catch((err) => {
            console.log(err);
            return false;
        })
})


app.get('/edituser', (req, res) => {
    let id = req.query.eid;
    UserModel.findById(id)
        .then((single) => {
            return res.render('edit', {
                single
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
})