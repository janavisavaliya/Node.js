const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const usersModel = require('../model/UserModel')

passport.use(new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        let user = await usersModel.users.findOne({ email: email });
        if (!user || user.password != password) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        console.log(user);
        return done(null, user);
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
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log(err);
        return done(err, null);
    }
})

passport.checkUserLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
};

passport.setUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.users = req.user;  // Fix: Use req.user instead of req.users
    }
    return next();
};
