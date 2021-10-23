// all routes for auth Model
    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/auth');
    
    
    
    
    router.post('/register', authController.register)

    router.post('/login', authController.login)

    router.post('/forgotpassword', authController.forgotpassword)

    router.put('/password-reset/:resetToken', authController.resetpassword)
    

    
    module.exports = router ;
    