const express = require('express');

const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser, addPostPage, viewPostPage, addPostUser, deletePostUser, editPostUser, updatePostUser } = require('../controllers/AuthController');


const routes = express.Router();
const multer = require('multer');

const passport = require('passport') //7



routes.get('/', loginPage) //null route
routes.post('/loginuser', /* 8 */ passport.authenticate('local', { failureRedirect: '/' }), loginUser) //login user
routes.get('/register', registerPage) //register user
routes.post('/registeruser', registerUser)//ahi vache middleware mukvu nahi
routes.get('/logoutuser', logoutUser) //logout
routes.get('/dashboard', passport.checkUserLogin, dashboardPage) // dashboard page
routes.get('/addpost', passport.checkUserLogin, addPostPage)// add data
routes.get('/viewpost', passport.checkUserLogin, viewPostPage) // view data
routes.get('/editpost', editPostUser)

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filname: (req, res, cb) => {
        cb(null, `${fileLoader.fieldname}-${Math.floor(Math.random() * 100000)}`);
    }
})

const fileUpload = multer({ storage: st }).single('image');



routes.post('/addpostuser', fileUpload, addPostUser);
routes.post('/updatepostuser', fileUpload, updatePostUser)
routes.get('/deleteuser', deletePostUser)


module.exports = routes;    