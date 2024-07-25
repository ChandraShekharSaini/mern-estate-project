const path=require('path');
const express = require('express');
const router=express.Router();

const controller = require('../controller/auth.controller');


router.post('/signup',controller.postSignup)

router.post('/signin',controller.getSignin)

router.post('/google',controller.postGoogleIn)

router.get('/signout/:id',controller.getSignout);


module.exports = router;