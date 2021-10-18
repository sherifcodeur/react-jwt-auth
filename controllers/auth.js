
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


const login = async (req,res,next) =>{


    const {email,password} = req.body

    if(!email || !password){

        res.status(400).json({

            success:false,
            error:"Please provide an username and a password"
        })

        
    }

    try {

      const user = await  User.findOne({email}).select("+password");


      if(!user) {

        res.status(400).json({

            success:false,
            error:"Incorrect Credentials"
        })
      }

      const isMatch = await user.matchPasswords(password)

      if(!isMatch){

        res.status(400).json({

            success:false,
            error:"Incorrect Credentials"
        })


      }

      res.status(200).json({

        success:true,
        token:"hehehduh"
      })
        
    } catch (error) {

        res.status(500).json({

            sucess:false,
            error:error.message
        })        
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