
const express = require('express');
const route = express.Router() ; 
const LoginController = require('./../controller/loginController');



route.post('/login', LoginController.signIn );
route.post('/signUp' , LoginController.signUp );
route.post('/logOut' , LoginController.logOut );








module.exports = route ; 