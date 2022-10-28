const express = require('express');
const router = express.Router();
const db = require('../db');
const { isSignedIn } = require('../middleware/IssignedIn');
const { isSeatavailable } = require('../middleware/TicketStatus');

//   get all seats 
router.get('/tickets', isSignedIn, (req, res) => {

    db.query(`SELECT auditorium.auditoriumName ,movies.movieName,seats.seatNo, seats.status, seats.price,shows.dateTime
     FROM (((seats INNER JOIN shows ON seats.auditoriumId=shows.auditoriumId)
    INNER JOIN movies On movies.auditoriumId = shows.auditoriumId) 
    inner join auditorium on auditorium.id=seats.auditoriumId)`, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: 'internal server error'
            });
        }

        return res.status(200).json({
            data: result
        });

    });
});


//   get available seats 
router.get('/availabletickets', isSignedIn, (req, res) => {

    db.query(`SELECT auditorium.auditoriumName ,movies.movieName,seats.seatNo, seats.status, seats.price,shows.dateTime
     FROM (((seats INNER JOIN shows ON seats.auditoriumId=shows.auditoriumId) 
     INNER JOIN movies On movies.auditoriumId = shows.auditoriumId) 
     inner join auditorium on auditorium.id=seats.auditoriumId)
     WHERE seats.status = ? `, [0], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: 'internal server error'
            });
        }

        return res.status(200).json({
            data: result
        });

    });
});


// ticket booking api  
router.post('/booktickets', isSignedIn, isSeatavailable,  (req, res) => {

    let seatId = req.body.seatId;
    let userId = req.auth;
    let auditoriumId = req.body.auditoriumId;
    let showId = req.body.showId;
    let movieId = req.body.movieId;

    let updatestatus = db.query("UPDATE seats SET  userId = ?, status = ?  WHERE id = ? AND status = ?   ",
        [userId, 1, seatId, 0], (err, result) => {
        if (err) {

            return res.status(500).json({
                error: 'internal server error'
            });
        }
    });

    if (updatestatus) {

        db.query("insert into booking(auditoriumId, seatId, movieId, showId, userId ) values(?,?,?,?,?)",
            [auditoriumId, seatId, movieId, showId, userId], (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: 'internal server error'
                });
            }

            res.status(201).json({
                message: 'Ticket booked  successfully'
            });

        });
    }

});



// show user booking 
router.get('/mytickets/:userId', isSignedIn, (req, res) => {
    let userId = req.params.userId;

    db.query(`SELECT b.id,m.movieName, s.dateTime, a.auditoriumName,u.name FROM booking b 
    inner join users u on u.id = b.userId 
    inner join auditorium a on a.id = b.auditoriumId  
    inner join movies m on m.id = b.movieId
     inner join shows s on s.id = b.showId where u.id
    =? `, [userId], (err, result) => {

        console.log(err);
        if (err) {
            return res.status(500).json({
                error: 'internal server error'
            });
        }

        return res.status(200).json({
            data: result
        });

    });
});


module.exports = router;