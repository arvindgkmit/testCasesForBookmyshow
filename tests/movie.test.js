const request = require('supertest');
const app = require('../app'); 

let admintoken = "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg";
let userToken = "eyJhbGciOiJIUzI1NiJ9.NA.oEFRX9AgOKmYS9jYWn-9H7fSOtIHED32B7TUGzDaGJA"

// movie api test cases
describe("movi api  test cases ", () => {
  it("tests /api/movies/movies for response 201 created", async () => {
      const response = await request(app)
      .post("/api/movies/movies")
      .auth(admintoken, {type: 'bearer'})
      .send({
        movieName: "black adam"
      })

      expect(response.body).toEqual({
        message:'Movie added successfully'
      })
      expect(response.statusCode).toBe(201)
  })

  it("tests /api/movies/movies for response 400 bad request", async () => {
    const response = await request(app)
    .post("/api/movies/movies")
    .auth(admintoken, {type: 'bearer'})
    .send({
      movieName: ""
    })

    expect(response.body).toEqual({
      message:'please enter the movie title'
    })
    expect(response.statusCode).toBe(400)
})

it("tests /api/movies/movies for response 401 unautherized", async () => {
    const response = await request(app)
    .post("/api/movies/movies")
    .send({
      movieName: "black adam"
    })

    expect(response.body).toEqual({
   
    })
    expect(response.statusCode).toBe(401)
})

it("tests /api/movies/movies for response 403 bad request", async () => {
    const response = await request(app)
    .post("/api/movies/movies")
    .auth(userToken, {type: 'bearer'})
    .send({
        movieName: "black adam"
    })
    expect(response.body).toEqual({
        message: "Admin access required"
     })
    expect(response.statusCode).toBe(403)
})

});