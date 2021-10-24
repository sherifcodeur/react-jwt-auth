const ErrorResponse = require('../utils/errorResponse')



const errorHandler = (err,req,res,next)=>{


    let error = {...err}

    error.message = err.message


    if(err.code === 11000){


        let message = "Duplicate field value entry"
        error = new ErrorResponse(message,400)

    }

    if(err.name === "ValidationError"){

        let message = Object.values(err.errors).map((val)=>val.message);

        error = new ErrorResponse("probleme de validation roger",400)
    }

    res.status(error.statusCode || 500).json({

        success:false,
        error:error.message || "server error"
    })





}


module.exports = errorHandler