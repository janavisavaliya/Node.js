const JWT = require('jsonwebtoken');
const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(200).send({
                success: false,
                message: "Blank Token",
            })
        }
        let newToken = token.slice(7);
        JWT.verify(newToken, 'bloguser', (err, decode) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid Token",
                })
            }
            req.user = decode.payload;
            return next();
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const authoriseRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next();
        }
        return res.status(400).send({
            success: false,
            message: "Unauthorised access",
        })
    }
}
module.exports = {
    verifyToken, authoriseRole
}