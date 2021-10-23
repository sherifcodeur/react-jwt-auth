
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

        sendToken(user,201,res)
        
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

     sendToken(user,200,res)
        
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

const sendToken = (user,statusCode,res)=>{

  const token = user.getSignedToken()

  res.status(statusCode).json({

    success:true,
    token
  })

}



module.exports = {

  register,
  login,
  forgotpassword,
  resetpassword

}