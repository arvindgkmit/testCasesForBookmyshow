const express = require('express');
const router = express.Router();
const db = require('../db');
const { isAdmin } = require("../middleware/Isadmin");
const { isSignedIn } = require('../middleware/IssignedIn');

// add movies by admin
router.post('/movies',isSignedIn ,isAdmin, (req,res)=>{
    let movieName = req.body.movieName;
    // console.log(title);
    if(movieName == ''){
    return res.status(400).json({
        message:"please enter the movie title"
    })}
 
    db.query("insert into movies(movieName) values(?)",[movieName],(err,result)=>
    {
        if(err)
        {
           return  res.status(500).json({
                error:'internal server error'
            });
        }
        
        return res.status(201).json({
            message:'Movie added successfully'
        });
    });
});

//

module.exports = router;