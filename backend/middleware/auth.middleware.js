const jwt = require("jsonwebtoken");
const User = require("../model/user.model");


async function protected(req, res, next){
    let token =  req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            success : false,
            message : "No found authorization denied"
        })
    };

    try {
        
        const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        let user = await User.findById(decoded._id)
        if(!user){
            return res.status(401).json({
            success : false,
            message : "No found authorization denied"
            })
        }

        req.user = user;
        next();


    } catch (err) {
        return res.status(401).json({
            success : false,
            message : "Token is not valid"
        })
    }
}

module.exports = protected;