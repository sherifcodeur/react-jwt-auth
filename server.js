
    // importing dependencies
    const express = require('express');
    const dotenv = require('dotenv').config();
    const dbconnect = require('./database/connection');

    const errorHandler = require('./middlewares/error')
    
    //importing routes - example company routes -
    const authRoutes = require('./routes/authRoutes');
    
    // PORT defined in the env file
    const PORT = process.env.PORT || 5000;
    
    
    // initializing express application
    const app = express();
    
    // connect to the database
    //dbconnect;
    
    
    
    // Request payload middleware
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    
    
    // Handle custom routes - add the custom routes
    // app.use('/api/v1/user', require('./routes/userRoutes'))
    app.use('/api/auth',authRoutes);
    

    //should be last piece of middleware
    app.use(errorHandler) 

    // app listens on the selected Port
    app.listen(PORT, () => {
      console.log("Server listening ")
    })

   
    