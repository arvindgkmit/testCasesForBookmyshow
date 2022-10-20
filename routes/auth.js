var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/signup', function(req, res, next) {
    const {body} = req; 
    let data = {
        name: body.name,
        email: body.email,
        password: body.password
    }

  res.status(201).json(data);
});

module.exports = router;
