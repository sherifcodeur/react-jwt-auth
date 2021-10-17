// all routes for auth Model
    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/auth');
    
    
    
    
    router.post('/register', authController.register)

    router.post('/login', authController.login)

    router.post('/forgotpassword', authController.forgotpassword)

    router.post('/resetpassword/:resetToken', authController.resetpassword)
    
    // router.post('/', authController.auth_post)
    
    // router.get('/show/:id',authController.auth_show)
    
    // router.put('/update/:id',authController.auth_put)
    
    // router.delete('/delete/:id',authController.auth_delete)
    
    // router.get('/search',authController.auth_search)
    
    module.exports = router ;
    