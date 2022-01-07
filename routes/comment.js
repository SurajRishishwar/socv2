const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController= require('../controllers/comment_controller');
router.post('/createcomment',passport.checkAuthenticate,commentController.createcomment);
router.get('/destroy/:id',passport.checkAuthenticate,commentController.destroy);
module.exports=router;