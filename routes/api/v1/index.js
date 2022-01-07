const express = require('express');
const router = express.Router();

router.use('/post',require('./postapi'));


module.exports = router;