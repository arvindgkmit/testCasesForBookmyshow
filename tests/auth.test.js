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



    test('return 404 bad when  user send invailid url', ()=>{
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







