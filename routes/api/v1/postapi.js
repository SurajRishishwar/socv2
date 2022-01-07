const express = require('express');
const router = express.Router();
const postapi= require('../../../controllers/api/v1/post_api');

router.get('/',postapi.posts);
router.get('/:id',postapi.delpost);


module.exports = router;