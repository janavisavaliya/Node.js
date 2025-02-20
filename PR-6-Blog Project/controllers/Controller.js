const userModel = require('../models/usersModel')

const fs = require('fs');

//login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.user.findOne({ email: email });

        if (!user || user.password != password) {
            console.log(`Email Or Password is incorrect`);
            return res.redirect('/');
        }

        res.cookie('auth', user);
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
}

//register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        await userModel.user.create({
            name: name,
            email: email,
            password: password
        });
        console.log("register successfully......!");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}

//View Blog Page
const viewBlog = async (req, res) => {
    try {
        return res.render('viewBlog', {
            allBlogs: await userModel.blogUser.find()
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}

//Add blog Data
const addBlogData = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(title);
        console.log(description);
        console.log(req.file);


        await userModel.blogUser.create({
            title: title,
            description: description,
            image: req.file?.path
        })
        console.log(`Blog  Successfully added......!`);
        return res.redirect('/viewblogpage');
    } catch (err) {
        console.log(err);
        return false;
    }
}

//Delete Blog Data
const deleteBlogData = async (req, res) => {
    try {
        let single = await userModel.blogUser.findById(req.query.delId)
        fs.unlinkSync(single?.image);

        await userModel.blogUser.findByIdAndDelete(req.query.delId);
        console.log(`BlogSuccessfully deleted......!`);
        return res.redirect('/viewblogpage');
    } catch (err) {
        console.log(err);
        return false;
    }
}

//Edit Blog Data
const editBlogData = async (req, res) => {
    try {
        return res.render('editBlog', {
            oneRow: await userModel.blogUser.findById(req.query.editId)
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

//Update Blog Data
const updateBlogData = async (req, res) => {
    try {
        const { editId, title, description } = req.body;

        if (req.file) {
            let oneRow = await userModel.blogUser.findById(editId);
            fs.unlinkSync(oneRow?.image);
            await userModel.blogUser.findByIdAndUpdate(editId, {
                title: title,
                description: description,
                image: req.file?.path
            })
            console.log("BlogSuccessfully updated......!");
            return res.redirect('/viewblogpage');
        } else {
            await userModel.blogUser.findByIdAndUpdate(editId, {
                title: title,
                description: description,
                image: req.file?.path
            })
            console.log("Blog Successfully updated......!");
            return res.redirect('/viewblogpage');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


//logout user
const logoutUser = (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/');
}


//Register Page
const registerPage = (req, res) => {
    return res.render('register');
}

//Login Page
const loginPage = (req, res) => {
    if (req.cookies?.auth) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
}

//Dashboard
const dashboardPage = (req, res) => {
    return res.render('dashboard');
}


//Add Blog
const addBlog = (req, res) => {
    return res.render('addBlog');
}


module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    viewBlog,
    addBlogData,
    deleteBlogData,
    editBlogData,
    updateBlogData,
    registerPage,
    loginPage,
    dashboardPage,
    addBlog,
}