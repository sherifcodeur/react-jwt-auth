
const User = require('../models/User')

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

        

        res.status(500).json({

            success:false,
            error:error.message
        })
        
    }
    
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