const request = require('supertest');
// const { response } = require('../app');
const app = require('../app'); 
let userToken = "eyJhbGciOiJIUzI1NiJ9.NA.oEFRX9AgOKmYS9jYWn-9H7fSOtIHED32B7TUGzDaGJA";
// signup api test cases
describe("Signup api  test cases ", () => {
  it("tests /api/auth/signup for response 201 succesfull signup", async () => {
      const response = await request(app)
      .post("/api/auth/signup")
      .send({
          name: "arvind",
          email: "arvind@gmail.com",
          password: "arvind@123"
      })
      expect(response.body).toEqual({
          message: "Registered successfully",
      })
      expect(response.statusCode).toBe(201)
  })


  it("tests /api/auth/signup for response 400 bad request", async () => {
    const response = await request(app)
    .post("/api/auth/signup")
    .send({
        name: "",
        email: "arvind@gmail.com",
        password: "arvind@123"
    })
    expect(response.body).toEqual({
        message: "please enter all required details",
    })
    expect(response.statusCode).toBe(400)
})



});



// login api test cases
describe("login api  test cases ", () => {
  it("tests /api/auth/login for response 200 succesfully login", async () => {
      const response = await request(app)
      .post("/api/auth/login")
      .send({
          email: "raghav@gmail.com",
          password: "raghav"
      })
      expect(response.body).toEqual({
        message: "Login successfully",
        token: "eyJhbGciOiJIUzI1NiJ9.NA.oEFRX9AgOKmYS9jYWn-9H7fSOtIHED32B7TUGzDaGJA"
      })
      expect(response.statusCode).toBe(200)
  })

  it("tests /api/auth/login for response 401 Unauthorized", async () => {
    const response = await request(app)
    .post("/api/auth/login")
    .send({
        email: "raghav@gmail.com",
        password: "rag"
    })
    expect(response.body).toEqual({
      message: "incorrect email and password"
    })
    expect(response.statusCode).toBe(401)
})

it("tests /api/auth/login for response 400 bad request", async () => {
  const response = await request(app)
  .post("/api/auth/login")
  .send({
      email: "",
      password: "rag"
  })
  expect(response.body).toEqual({
    message: "please enter email and password"
  })
  expect(response.statusCode).toBe(400)
})

});



describe("logout api  test cases ", () => {
  it("tests /api/auth/logout for response 200 succesfully logout", async () => {
      const response = await request(app)
      .post("/api/auth/logout")
      .auth(userToken, {type: 'bearer'})
      expect(response.body).toEqual({
        message: "Logout Successfully"
      })
      expect(response.statusCode).toBe(200)
  })

  it("tests /api/auth/login for response 401 Unauthorized", async () => {
    const response = await request(app)
    .post("/api/auth/logout")
    expect(response.statusCode).toBe(401)
})



});











