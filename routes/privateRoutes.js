// all routes for privateRoutes Model
    const express = require('express');
    const router = express.Router();
    const privateController = require('../controllers/private');
    
    
    
    
    router.get('/', privateController.private_get)
    
        
    module.exports = router ;
    