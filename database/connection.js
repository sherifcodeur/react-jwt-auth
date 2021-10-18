

const mongoose = require('mongoose');


// database connection (MongoDB) 
const dbURI = process.env.MONGODB_URL;

const dbconnect = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to Database"))
  .catch((err) =>{

    console.log('connection to db problem')
      
    throw new Error(err);

  }).catch( e => { console.error(e) })


module.exports = dbconnect;