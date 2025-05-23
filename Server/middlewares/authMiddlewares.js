const jwt = require("jsonwebtoken");
//token validation
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //encryted in userRoutes.js using sign()
        const dcryptedToken = jwt.verify(token, process.env.secret_jwt);
        req.userId = dcryptedToken.userId;
        next(); //callback function where we are calling the middlewares
    } catch (error) {
        res.status(401).json({ message: error.message, success: false });
    }
};
