
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')


const authMiddleware = async (req,res,next)=>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){


        token = req.headers.authorization.split(" ")[1]
    }


    if(!token){

        return next(new ErrorResponse("you don't have access to this route",401))
    }


    try {
        
        decoded =  jwt.verify(token,process.env.JWT_SECRET)
        user = User.findById(decoded.id);

        if(!user){

            return next(new ErrorResponse("no user found with this id"),401)
        }

        req.user = user

        next();

    } catch (error) {

        return next(new ErrorResponse("no authorized acees to this router"),401)
        
    }

}


module.exports = authMiddleware