const request = require('supertest');
const app = require('../app'); 

// ticke api test cases
 describe('test cases for ticket api', ()=>{

    test('return 200 created when user get all tickets', ()=>{
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


    test('return 404 unauthorized when admin send wrong token', ()=>{
        return  request(app)
        .get('/ticket/tickets')
        .expect(401)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw." 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: "user not found"
            })
        });
    });


test('return 400 Bad request when user not login', ()=>{
    return request(app)
    .get('/ticket/tickets')
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