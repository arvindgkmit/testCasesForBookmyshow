const request = require('supertest');
const app = require('../app'); 

// movie api test cases
 describe('test cases for movies api', ()=>{

    test('return 201 created when admin add movie successfully', ()=>{
        return  request(app)
        .post('/movies/movies',)
        .send({
            movieName: "black adam"
        })
        .expect(201)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg" 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: 'movie added successfully'
            })
        });
    });


    test('return 401 unauthorized when admin send wrong token', ()=>{
        return  request(app)
        .post('/movie/movies',)
        .send({
            movieName: "black adam"
        })
        .expect(401)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw." 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: "you have not access for add movie"
            })
        });
    });


    test('return 422 Unprocessable Entity when user enter number in movieName', ()=>{
        return request(app)
        .post('/movie/movies')
        .send({
            movieName: "1234345678"
        })
        .expect(422)
        .expect(req.headers).toEqual({
            Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg" 
        })
        .then((response)=>{
            expect(response.body).toEqual({
                message: "you have not access for add movie"
            });
    });

});


test('return 400 Bad request when user does not enter movieName', ()=>{
    return request(app)
    .post('/movie/movies')
    .send({
        movieName: ""
    })
    .expect(400)
    .expect(req.headers).toEqual({
        Authorization: "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg" 
    })
    .then((response)=>{
        expect(response.body).toEqual({
            message: "please enter movie name"
        });
});
});


 });