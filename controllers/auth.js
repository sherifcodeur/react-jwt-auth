
    
// const auth = require('../models/auth')

const register = (req,res,next) =>{


    res.send("registering user")
}


const login = (req,res,next) =>{


    res.send("login user")
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