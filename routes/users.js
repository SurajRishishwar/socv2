const express = require('express');
const router = express.Router();
        const passport = require('passport');

const userController = require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthenticate,userController.uprofile);
router.post('/update/:id',passport.checkAuthenticate,userController.update);

//const userPostt = require('../controllers/users_controller');
router.get('/userpost',userController.userpost)

router.get('/sign-in',userController.signin);

router.get('/sign-up',userController.signup);


router.post('/create',userController.createuser);

router.post('/createsess',passport.authenticate('local',{failureRedirect:'/users/sign-in'},),userController.createsession);

router.get('/sign-out',userController.signout);

//try

router.get('/profilepost',userController.profilepost);

router.get('/profile/:userid',userController.profileofuser); 



module.exports = router;