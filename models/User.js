
    // User Model


    //importing external dependencies
    const mongoose = require('mongoose');
    const {isEmail} = require('validator');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');



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


    // creating model User based on the user schema
    const User = mongoose.model('user',userSchema);


   


    //exporting the model User
    module.exports =  User ;