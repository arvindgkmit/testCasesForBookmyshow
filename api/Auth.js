
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isSignedIn } = require('../middleware/IssignedIn');

const db = require('../db');

// signup api 
router.post('/signup', [], (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    console.log(name, email, password);
    if (name == '' || email == '' || password == '') {
        return res.status(400).json({
            message: "please enter all required details"
        })
    }
    
    let hash_password = bcrypt.hashSync(password, 10);
    db.query("insert into users(name,email,password) values(?,?,?)", [name, email, hash_password], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: 'internal server error'
            });
        }

        return res.status(201).json({
            message: 'Registered successfully'
        });

    });
});



// Login api  
router.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email == '' || password == '') {
        return res.status(400).json({
            message: "please enter email and password"
        })
    }

    db.query("select * from users where email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'internal server error'
            });
        }

        if (result.length == 0)
            return res.status(401).json(
                { message: "email or password does not exist" }
            );

        let validate_password = bcrypt.compareSync(password, result[0].password);

        if (validate_password) {
            const token = jwt.sign(result[0].id, process.env.SECRET)
            res.cookie("token", token, { expire: new Date() + 100000 });

            return res.status(200).json({
                message: "Login successfully",
                token: token
            });
        }
        
        else {
            return res.status(401).json({ message: "incorrect email and password" });
        }
    });
});



// logout api
router.post('/logout', isSignedIn, (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Logout Successfully"
    })
});

module.exports = router;