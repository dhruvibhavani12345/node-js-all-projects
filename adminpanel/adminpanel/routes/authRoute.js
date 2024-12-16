const express = require('express');

const routes = express.Router();

const { loginPage, registerPage, registerUser,loginUser,dashboardPage,logoutUser,forgotPassword,otpPage,postOtp,newpass,postNewpassword , myprofile , profilechange , postchangepassword , changepassword} = require('../controllers/AuthController');

const passport = require('passport');


routes.get('/',loginPage)
routes.get('/register',registerPage)
routes.post('/registeruser',registerUser);
routes.post('/loginuser',passport.authenticate('local',{failureRedirect:'/'}),loginUser)
routes.get('/dashboard',passport.checkUser,dashboardPage);
routes.get('/logoutuser',logoutUser)

//forgot password
routes.post('/forgotpassword',forgotPassword)
routes.get('/otp',otpPage)
routes.post('/postotp',postOtp)
routes.get('/newpass',newpass)
routes.post('/postnewpassword',postNewpassword)

routes.get('/myprofile',myprofile);
routes.post('/profilechange',profilechange);

routes.get('/changepassword', changepassword);
routes.post('/postchangepassword',postchangepassword);





module.exports = routes;
