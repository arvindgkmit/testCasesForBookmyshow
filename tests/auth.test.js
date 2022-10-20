const request = require('supertest');
// const { response } = require('../app');
const app = require('../app'); 

// test cases for signup api
describe('test cases for signup api', ()=>{
    test('return 201 created when signup request is valid', ()=>{
        return request(app)
        .post('/auth/signup')
        .send({
            name: "arvind",
            email: "arvind@gmail.com",
            password: "arvind@123"
        })
        .expect(201)
        .then((response)=>{
            expect({
                message: 'signup successfully'
            })
        });
    })


    test('return 400 bad when user skip one or more mandatory fields', ()=>{
        return request(app)
        .post('/auth/signup')
        .send({
            name: "arvind",
            password: "arvind@123"
        })
        .expect(400)
        .then((response)=>{
            expect({
                message: 'please fill the all  required fields'
            })
        });
    });



    test('return 404 notfound when user send invailid url', ()=>{
        return request(app)
        .post('/auth/signu')
        .send({
            name: "arvind",
            email: "arvind@gmail.com",
            password: "arvind@123"
        })
        .expect(404)
        .then((response)=>{
            expect({
                message: 'page not found'
            })
        });
    });



    test('return 409 conflict when  user send duplicate email', ()=>{
        return request(app)
        .post('/auth/signup')
        .send({
            name: "arvind",
            email: "arvind@gmail.com",
            password: "arvind@123"
        })
        .expect(409)
        .then((response)=>{
            expect({
                message: 'email is already exist'
            })
        });
    });


    test('return 422 Unprocessable Entity when user enter number in name or email field', ()=>{
        return request(app)
        .post('/auth/signup')
        .send({
            name: "1234345678",
            email: "arvind@gmail.com",
            password: "arvind@123"
        })
        .expect(422)
        .then((response)=>{
            expect({
                message: 'please enter correct value '
            })
        });
    });


});

// test cases for login api 

describe('test cases for login api ', ()=>{
    test('return 200 ok when user login successfully', ()=>{
        return request(app)
        .post('/auth/login')
        .send({
            email: 'arvind@gmail.com',
            password: "arvind@123"
        })
        .expect(200)
        .then((response)=>{
            expect({
                accessToken: "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg" 
            })
        })
    });


    test('return 401 unauthorized when user send wrong email or password', ()=>{
        return request(app)
        .post('/auth/login')
        .send({
            email: 'arvid@gmail.com',
            password: "arvind@123"
        })
        .expect(401)
        .then((response)=>{
            expect({
                message: "please enter correct email or password" 
            })
        })
    });

    test('return 400 bad when user request with one or more mandatory fields', ()=>{
        return request(app)
        .post('/auth/login')
        .send({
            email: "",
            password: "arvind@123"
        })
        .expect(400)
        .then((response)=>{
            expect({
                message: 'please fill the all  required fields'
            })
        });
    });

});

   // test cases for logout
    describe('test cases for logout api ', ()=>{
        test('return 404 not found when user pass invaild access token', ()=>{
            return request(app)
            .post('/auth/login')
            .send({
                Headers: "eyJhbGciOiJIUzI1NiJ9.Mw.7"
            })
            .expect(404)
            .then((response)=>{
                expect({
                    message: 'user not found'
                })
            });
        });

        test('return 401 unauthorized when user does not pass access token', ()=>{
            return request(app)
            .post('/auth/login')
            .send({
                Headers: ""
            })
            .expect(401)
            .then((response)=>{
                expect({
                    message: 'user not login, please login '
                })
            });
        });
        


    });








