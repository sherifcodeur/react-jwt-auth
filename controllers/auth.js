
const User = require('../models/User');

const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail')


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

const forgotpassword = async (req,res,next) =>{

  // we grab the email 
  let {email} = req.body

  try {
    // we check for the user in the db with this email
  const user = await User.findOne({email}) ;

  // if there is no user we send an error
  if(!user){

    return next(new ErrorResponse("no email could be sent",404))
  }

  // we create a token with crypto and grab the date and add them to user --- view in user model

  const resetToken = user.getResetPasswordToken();

  // we save in database
  await user.save()

  // we create the link to be sent

  let resetUrl = `${process.env.BASE_URL}:${process.env.PORT_FRONT}/password-reset/${resetToken}`


  // we create the message to be sent

   // HTML Message
   const message = `
   <h1>You have requested a password reset</h1>
   <p>Please make a put request to the following link:</p>
   <a href=${resetUrl}>${resetUrl}</a>
 `;

  // we email the message
try {
  
    await sendEmail({      
      to:user.email,
      subject:"Reset Password Link",
      text:message
    })
// we send a positive status if email sent with success
res.status(200).send("email successfully sent")
} catch (error) {


  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  return next(new ErrorResponse("email could not be sent",500))
  
  
}
  } catch (error) {
    next(error)
  }
  


  






    // res.send("forgotpassword")
}

const resetpassword = async (req,res,next)=>{

        const receivedToken = req.params.resetToken

        const resetPasswordToken = crypto.createHash("sha256").update(receivedToken).digest("hex");



      // on check if there is a user in database with this token 

      try {

         const user = await User.findOne({
           
          resetPasswordToken,
          resetPasswordExpire: { $gt: Date.now() }
        
        })

        if(!user){

          return next(new ErrorResponse("invalid link",400))
        }


        user.password = req.body.password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(201).json({
          success: true,
          data: "Password Updated Success",
          token: user.getSignedToken(),
        });


      } catch (error) {

        return next(error)
      }

     
 


      // we check if it is still valid if not we reset token and date to undefined and send back error


    



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