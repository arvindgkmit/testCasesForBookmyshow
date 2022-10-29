const express = require('express');
const router = express.Router();
const db = require('../db');
const { isAdmin } = require("../middleware/Isadmin");
const { isSignedIn } = require('../middleware/IssignedIn');

// add auditorium by  admin 
router.post('/auditorium', isSignedIn, isAdmin, (req, res) => {

    let auditoriumName = req.body.auditoriumName;
    let city = req.body.city;
    let seats = req.body.seats;

    if (auditoriumName == '' || city == '' || seats == '') {
        return res.status(400).json({
            message: "please enter the all details"
        })
    }

    db.query("insert into auditorium(auditoriumName, city, seats) values(?,?,?)", [auditoriumName, city, seats], (err, result) =>
     {
        if (err) {
            return res.status(500).json({
                error: 'internal server error'
            });
        }

        return res.status(201).json({
            message: 'auditorium added successfully'
        });

    });
});


// create shows by admin 
router.post('/shows', isSignedIn, isAdmin, (req, res) => {

    let movieId = req.body.movieId;
    let auditoriumId = req.body.auditoriumId;
    let dateTime = req.body.dateTime;

    if (movieId == '' || auditoriumId == '' || dateTime == '') {
        return res.status(400).json({
            message: "please enter the all details"
        })
    }

    db.query("insert into shows(movieId, auditoriumId, dateTime) values(?,?,?)", [movieId, auditoriumId, dateTime], (err, result) => 
    {
        if (err) {
            return res.status(500).json({
                error: 'internal server error'
            });
        }

        return res.status(201).json({
            message: 'show added successfully'
        });

    });
});


// available seat api   

// router.post('/seats',isSignedIn ,isAdmin, (req,res)=>{
//     let auditoriumId = req.body.auditoriumId;
//     // let seatNo = req.body.seatNo;
//     // console.log(seatNo, auditoriumId) ;
//     if(auditoriumId == ''){
//     return res.status(401).json({
//         message:"please enter the all details"
//     })}
//     // let totalSeat;
// //     db.query("SELECT seats FROM auditorium WHERE id = ? ", [auditoriumId], (err,result)=>{
// //     if(err)
// //         {
// //             console.log(err);
// //            return  res.status(500).json({
// //                 error:'internal server error'
// //             });
// //         }
// //         console.log(result[0]);
// //         // console.log("total seats",result[0]);
// //         totalSeat = res.status(200).json({
// //             message:'get total seats successfully',
// //             total: result[0].seats


// //         });


// //    });
// //    console.log("sdsgsggh");
// //    console.log("total seats",totalSeat);

//     for(let seatCounter = 1; seatCounter<=30; seatCounter++){

//     db.query("insert into seats(auditoriumId, seatNo ) values(?,?)",[auditoriumId,seatCounter ],(err,result)=>

//     {
//         if(err)
//         {
//            return  res.status(500).json({
//                 error:'internal server error'
//             });
//         }
//          res.status(201).json({
//             message:'seat added successfully'
//         });
//     });
//     }
// });



router.post('/seats', isSignedIn, isAdmin, (req, res) => {
    
    let auditoriumId = req.body.auditoriumId;
    let seatNo = req.body.seatNo;
    
    if (auditoriumId == '') {
        return res.status(400).json({
            message: "please enter the all details"
        })
    }

    db.query("insert into seats(auditoriumId, seatNo ) values(?,?)", [auditoriumId, seatNo], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: 'internal server error'
            });
        }
        res.status(201).json({
            message: 'seat added successfully'
        });
    });
});




module.exports = router;