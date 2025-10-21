const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const protect = async (req,res,next)=>{
    try{
        let token = req.headers.authorization;

        if(token && token.startsWith("Bearer")){
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            next();
        }
        else{
            return res.status(401).json({ message: "Not Authorized , Token Not Found"})
        }
    }

    catch(error){
        res.status(401).json({
            message: "Token failed",
            error : error.message
        })
    }
}

module.exports = protect
