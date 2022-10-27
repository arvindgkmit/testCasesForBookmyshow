const request = require('supertest');
const app = require('../app'); 

// test cases for add auditorium api 
 describe('test cases for add auditorium api', ()=>{

    test('return 201 ok when admin add a auditorium', ()=>{
        return  request(app)
        .post('/auditorium/auditorium',)
        .send({
            auditoriumName: 'lake city',
            city: 'udaipur',
            seats: 20
        })
        .expect(201)
        .expect(req.headers).toEqual({
            Authorization: 'eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg'
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: 'auditorium added successfully'
            })
        });
    });


    test('return 400 bad request when admin add skip any field', ()=>{
        return  request(app)
        .post('/auditorium/auditorium',)
        .send({
            auditoriumName: 'lake city',
            city: '',
            seats: 20
        })
        .expect(400)
        .expect(req.headers).toEqual({
            Authorization: 'eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg' 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: 'please fill the all required fields'
            })
        });
    });

    test('return 403 forbidden when admin send wrong token', ()=>{
        return  request(app)
        .post('/auditorium/auditorium')
        .send({
            auditoriumName: 'lake city',
            city: 'udaipur',
            seats: 20
        })
        .expect(403)
        .expect(req.headers).toEqual({
            Authorization: 'eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg'
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: 'you can not access this page'
            })
        });
    });


test('return 401 unauthorized when user not login', ()=>{
    return request(app)
    .post('/auditorium/auditorium')
    .send({
        auditoriumName: 'lake city',
        city: 'udaipur',
        seats: 20
    })
    .expect(401)
    .expect(req.headers).toEqual({
        Authorization: '' 
    })
    .then((response)=>{
        expect(response.body).toEqual({
            message: 'please login'
        });
});
});


 });