const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const usersModel = require('../models/UserModel')

passport.use(new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        let user = await usersModel.users.findOne({ email: email });
        if (!user || user.password != password) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        console.log(user);
        return done(null, user); // user object is passed to the callback
    } catch (err) {
        console.log(err);
        return false;
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await usersModel.users.findById(id);
        if (!user) {
            return done(null, false); // User not found
        }
        return done(null, user);
    } catch (err) {
        console.log(err);
        return done(err, null); // Return error properly
    }
})

passport.checkUserLogin = (req, res, next) => {
    console.log(req.users);

    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
}

passport.setUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.users = req.users;
    }
    return next();
}