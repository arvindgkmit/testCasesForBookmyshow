// const { emit } = require("../connection");
const db = require("../db");

exports.isSeatavailable = (req,res,next)=>
{
    let seatId = req.body.seatId;
    db.query("select status from seats where id=?",[seatId],(err,result)=>
    {
        if(err) 
        return res.status(503).json({message : "Seat not available"});


        if(result.length==0)
        return res.status(400).json({message:"Seat does not exist"});

        if(result[0].status==1)
        return res.status(400).json({message:"Seat is already booked"});

        next();
    });
}