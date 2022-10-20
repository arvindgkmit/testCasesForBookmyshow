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

});


// test cases for login api 






