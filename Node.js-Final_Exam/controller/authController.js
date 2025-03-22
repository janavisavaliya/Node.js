const Users = require('../model/UserModel');

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
        const user = await Users.users.findOne({ email: email })

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
    aboutPage
}


