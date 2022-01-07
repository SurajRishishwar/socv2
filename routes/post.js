const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController= require('../controllers/posts_controller');
router.post('/createpost',passport.checkAuthenticate,postController.createpost);
router.get('/destroy/:id',passport.checkAuthenticate,postController.destroy);
module.exports=router;