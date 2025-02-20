const checkUser = (req,res,next) => {
    if(!req.cookies?.auth){
        return res.redirect('/');
    }
    return next();
}

module.exports = {
    checkUser
}