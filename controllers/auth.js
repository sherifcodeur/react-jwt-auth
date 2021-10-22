
const User = require('../models/User');

const ErrorResponse = require('../utils/errorResponse');


const register = async (req,res,next) =>{

    const {username,email,password} = req.body;

    try {

        const user = await User.create({

            username,
            email,
            password

        });

        res.status(201).json({

            success:true,
            user
        })
        
    } catch (error) {
        
        next(error)
        
    }
    
}


const login = async (req,res,next) =>{


    const {email,password} = req.body

    if(!email || !password){

      return  next(new ErrorResponse("Please provide an username and a password",400))

        
    }

    try {

      const user = await  User.findOne({email}).select("+password");


      if(!user) {

       return next(new ErrorResponse("Incorrect Credential",400))
      }

      const isMatch = await user.matchPasswords(password)

      if(!isMatch){

       return next(new ErrorResponse("Incorrect Credentials",400))


      }

      res.status(200).json({

        success:true,
        token:"hehehduh"
      })
        
    } catch (error) {

        next(error)    
    }
}

const forgotpassword = (req,res,next) =>{


    res.send("forgotpassword")
}

const resetpassword = (req,res,next)=>{

        res.send("reset password")

}



module.exports = {

  register,
  login,
  forgotpassword,
  resetpassword

}