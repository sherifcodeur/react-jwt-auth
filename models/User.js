
    // User Model


    //importing external dependencies
    const mongoose = require('mongoose');
    const {isEmail} = require('validator');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');



    // creating User Schema
    const Schema = mongoose.Schema;
    const userSchema = new Schema({

        username : {
            type:String,
            required:[true,'required field'],       
        },
        email:{
            type:String,
            required:[true,'the email is required'],
            unique:true,
            lowercase:true,
            validate:[isEmail,'Please enter a valid email']

        },
        password:{
            type:String,
            required:[true,'please enter a password'],
            minlength:6,
            select:false
        },
        resetPasswordToken:String,
        resetPasswordExpire:Date,
    
    },     
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        { timestamps: true }
    );


    userSchema.pre('save',async function(next){

        if(!this.isModified('password')){

            next();
        }

        const salt = await bcrypt.genSalt(10);

            this.password = await bcrypt.hash(this.password,salt)


            next();
    })

    userSchema.methods.matchPasswords = async function(password){

        return await bcrypt.compare(password,this.password)
    }


    userSchema.methods.getSignedToken =  function(){

            return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
    }


    
    userSchema.methods.getResetPasswordToken = function(){

        // we created a reset token randomly
        const resetToken = crypto.randomBytes(20).toString("hex");

        // we generate a hash using the previous resetToken and save it in db
        this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // we save the expiration date 10 minutes from now
        this.resetPasswordExpire = Date.now() + 10 * (60*1000) ; // ten minutes

        // we return the resetToken
        return resetToken;
    }


    // creating model User based on the user schema
    const User = mongoose.model('user',userSchema);


   


    //exporting the model User
    module.exports =  User ;