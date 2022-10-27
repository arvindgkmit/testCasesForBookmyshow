const request = require('supertest');
const app = require('../app'); 

// ticke api test cases
 describe('test cases for get all ticket api', ()=>{

    test('return 200 ok when user get all tickets', ()=>{
        return  request(app)
        .get('/ticket/tickets',)
        .expect(200)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg" 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                "data": [
                    {
                        "auditoriumName": "Lake City Mall",
                        "movieName": "Black Adam",
                        "seatNo": 1,
                        "status": 0,
                        "price": 250,
                        "dateTime": "2020-10-22T06:30:00.000Z"
                    },
                    {
                        "auditoriumName": "Lake City Mall",
                        "movieName": "Black Adam",
                        "seatNo": 2,
                        "status": 0,
                        "price": 250,
                        "dateTime": "2020-10-22T06:30:00.000Z"
                    }
                ]
            })
        });
    });


    test('return 404 not found when admin send wrong token', ()=>{
        return  request(app)
        .get('/ticket/tickets')
        .expect(404)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw." 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: "user not found"
            })
        });
    });


test('return 401 unauthorized when user not login', ()=>{
    return request(app)
    .get('/ticket/tickets')
    .expect(401)
    .expect(req.headers).toEqual({
        Authorization: "" 
    })
    .then((response)=>{
        expect(response.body).toEqual({
            message: "please login"
        });
});
});


 });


 // test cases for available seats
 describe('test cases for available seats  api', ()=>{

    test('return 200 ok when user get available seats', ()=>{
        return  request(app)
        .get('/ticket/availabletickets',)
        .expect(200)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg" 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                "data": [
                    {
                        "auditoriumName": "Lake City Mall",
                        "movieName": "Black Adam",
                        "seatNo": 1,
                        "status": 0,
                        "price": 250,
                        "dateTime": "2020-10-22T06:30:00.000Z"
                    },
                    {
                        "auditoriumName": "Lake City Mall",
                        "movieName": "Black Adam",
                        "seatNo": 2,
                        "status": 0,
                        "price": 250,
                        "dateTime": "2020-10-22T06:30:00.000Z"
                    }
                ]
            })
        });
    });


    test('return 404 not found when admin send wrong token', ()=>{
        return  request(app)
        .get('/ticket/availabletickets')
        .expect(404)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw." 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: "user not found"
            })
        });
    });


test('return 401 unauthorized when user not login', ()=>{
    return request(app)
    .get('/ticket/availabletickets')
    .expect(400)
    .expect(req.headers).toEqual({
        Authorization: "" 
    })
    .then((response)=>{
        expect(response.body).toEqual({
            message: "please login"
        });
});
});


 });


 // test cases for ticket booking api 
 describe('test cases for available seats  api', ()=>{

    test('return 201 ok when user booked ticket successfully', ()=>{
        return  request(app)
        .post('/ticket/booktickets',)
        .send({
            seatId: 4,
            auditoriumId: 2,
            showId: 1,
            movieId: 5
        })
        .expect(201)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg" 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: 'Ticket booked successfully'
            })
        });
    });


    test('return 404 unauthorized when admin send wrong token', ()=>{
        return  request(app)
        .post('/ticket/booktickets')
        .send({
            seatId: 4,
            auditoriumId: 2,
            showId: 1,
            movieId: 5
        })
        .expect(404)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw." 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: "user not found"
            })
        });
    });


test('return 400 Bad request when seat is not available', ()=>{
    return request(app)
    .post('/ticket/booktickets')
    .send({
        seatId: 4,
        auditoriumId: 2,
        showId: 1,
        movieId: 5
    })
    .expect(400)
    .expect(req.headers).toEqual({
        Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg"
    })
    .then((response)=>{
        expect(response.body).toEqual({
            message: "seat is not available "
        });
});
});

test('return 401 unauthorized when user not login', ()=>{
    return request(app)
    .post('/ticket/booktickets')
    .send({
        seatId: 4,
        auditoriumId: 2,
        showId: 1,
        movieId: 5
    })
    .expect(401)
    .expect(req.headers).toEqual({
        Authorization: ""
    })
    .then((response)=>{
        expect(response.body).toEqual({
            message: "please login"
        });
});
});


 });


