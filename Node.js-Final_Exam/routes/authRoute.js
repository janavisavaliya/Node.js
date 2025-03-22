const express = require('express');



const routes = express.Router();

const multer = require('multer');

const passport = require('passport') //7

const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser } = require('../controller/authController');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filname: (req, res, cb) => {
        cb(null, `${fileLoader.fieldname}-${Math.floor(Math.random() * 100000)}`);
    }
})

const fileUpload = multer({ storage: st }).single('image');

routes.get('/', loginPage) //null route
routes.post('/loginuser', /* 8 */ passport.authenticate('local', { failureRedirect: '/' }), loginUser) //login user
routes.get('/register', registerPage) //register user
routes.post('/registeruser', registerUser)//ahi vache middleware mukvu nahi
routes.get('/logoutuser', logoutUser) //logout
routes.get('/dashboard', passport.checkUserLogin, dashboardPage); // dashboard page



module.exports = routes;    