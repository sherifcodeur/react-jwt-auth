
    




// retrieve all privates in the database
const private_get = async (req,res)=>{

    res.status(200).json({

        success:true,
        data:"you got access to the private data of this route"
    })

   
}

module.exports = {

    private_get,
   


}