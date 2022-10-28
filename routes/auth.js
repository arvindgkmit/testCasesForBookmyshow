var express = require('express');
var router = express.Router();
const auth = require('../api/Auth')
/* GET users listing. */
router.post('/signup', auth);

module.exports = router;
