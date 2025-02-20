const Users = require('../models/UserModel');

const fs = require('fs')

// registerPage
const registerPage = (req, res) => {
    return res.render('register');
}

// loginpage 
const loginPage = (req, res) => {
    // // return res.redirect('/dashboard')
    // return res.render('login');

    if (req.locals?.users) {
        return res.redirect('/dashboard');
    }
    return res.render('login');

}

// loginuser 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.users.findOne({ email: email });

        if (!user || user.password != password) {
            console.log('PLEASE ENTER VALID PASS & EMAIL');
            return res.redirect('/');
        }
        // res.cookie('auth', user);
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false
    }

}

//register user 
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await Users.users.create({
            name: name,
            email: email,
            password: password
        })
        console.log('USER REGISTER');
        console.log('name,email,password');
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}

// dashboardpage 
const dashboardPage = (req, res) => {
    return res.render('dashboard')
}

// addblogpage 
const addPostPage = (req, res) => {
    return res.render('addpost')
}

// viewblogpage 
const viewPostPage = async (req, res) => {
    try {
        return res.render('viewpost', {
            allBlogs: await Users.blogUser.find()
        });
    } catch (err) {
        console.log(err);
        return false
    }
}

// add data 
const addPostUser = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        await Users.blogUser.create({
            title: title,
            description: description,
            date: date,
            image: req.file?.path
        })
        console.log(`DATA ADD..!`);
        return res.redirect('/viewpost')
    } catch (err) {
        console.log(err);
        return false;
    }
}

// delete data 
const deletePostUser = async (req, res) => {
    try {
        let single = await Users.blogUser.findById(req.query.deleteId);
        fs.unlinkSync(single?.image)
        await Users.blogUser.findByIdAndDelete(req.query.deleteId)
        console.log(`DATA DELETE..!`);
        return res.redirect('/viewpost')
    } catch (err) {
        console.log(err);
        return false
    }
}

// edit data 
const editPostUser = async (req, res) => {
    try {
        return res.render('editpost', {
            singleRow: await Users.blogUser.findById(req.query.editId)
        })
    } catch (err) {
        console.log(err);
        return false
    }
}

// update data 
const updatePostUser = async (req, res) => {
    try {
        const { editId, title, description, date } = req.body;
        if (req.file) {
            let singleRow = await Users.blogUser.findById(editId);
            fs.unlinkSync(singleRow?.image);
            await Users.blogUser.findByIdAndUpdate(editId, {
                title: title,
                description: description,
                image: req.file?.path
            })
            console.log(`DATA UPDATE`);
            return res.redirect('/viewpost')
        }
    } catch (err) {
        console.log(err);
        return false
    }
}


// logoutuser 
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            // In case of an error while destroying session, redirect to a fallback page
            return res.redirect('/dashboard');
        }

        // Clear the cookie (ensure that 'auth' is the correct cookie name)
        res.clearCookie('auth'); // Ensure this is the correct cookie name for session

        // Redirect to login page or home after logging out
        return res.redirect('/'); // or '/' to go back to home page
    });
};


// registerPage
const aboutPage = (req, res) => {
    return res.render('about');
}



module.exports = {
    registerPage,
    loginPage,
    dashboardPage,
    registerUser,
    logoutUser,
    loginUser,
    addPostPage,
    addPostUser,
    deletePostUser,
    editPostUser,
    updatePostUser,
    viewPostPage,
    aboutPage
}


