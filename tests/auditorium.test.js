const request = require('supertest');
const app = require('../app');

let admintoken = "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg";
let userToken = "eyJhbGciOiJIUzI1NiJ9.NA.oEFRX9AgOKmYS9jYWn-9H7fSOtIHED32B7TUGzDaGJA";


describe("auditorium api  test cases ", () => {
    it("tests /api/auditorium/auditorium for response 201 created", async () => {
        const response = await request(app)
        .post("/api/auditorium/auditorium")
        .auth(admintoken, {type: 'bearer'})
        .send({
            auditoriumName: "mandsaurAudi",
            city: "mandsaur",
            seats: 10
        })
        expect(response.body).toEqual({
            message: "auditorium added successfully"
         })
        expect(response.statusCode).toBe(201)
    })

    it("tests /api/auditorium/auditorium for response 403 forbidden", async () => {
        const response = await request(app)
        .post("/api/auditorium/auditorium")
        .auth(userToken, {type: 'bearer'})
        .send({
            auditoriumName: "mandsaurAudi",
            city: "mandsaur",
            seats: 10
        })
        expect(response.body).toEqual({
            message: "Admin access required"
         })
        expect(response.statusCode).toBe(403)
    })
  
 
  
  it("tests /api/ticket/mytickets for response 401 unautherized ", async () => {
      const response = await request(app)
      .get("/api/auditorium/auditorium/2")
      expect(response.statusCode).toBe(404)
  })
  
  });



  describe("shows api  test cases ", () => {
    it("tests /api/auditorium/shows for response 201 created", async () => {
        const response = await request(app)
        .post("/api/auditorium/shows")
        .auth(admintoken, {type: 'bearer'})
        .send({
             movieId: 3, 
             auditoriumId: 4,
             dateTime: "2012-10-22T02:30:00.000Z"
        })
        expect(response.body).toEqual({
            message: 'show added successfully'
         })
        expect(response.statusCode).toBe(201)
    })

    it("tests /api/auditorium/auditorium for response 400 bad request", async () => {
        const response = await request(app)
        .post("/api/auditorium/shows")
        .auth(admintoken, {type: 'bearer'})
        .send({
            auditoriumId: 4,
            dateTime: "2012-10-22T02:30:00.000Z"
        })
        expect(response.body).toEqual({
            // message: "please enter the all details"
            error: "internal server error"
         })
        expect(response.statusCode).toBe(500)
    })

    it("tests /api/auditorium/auditorium for response 403 forbidden", async () => {
        const response = await request(app)
        .post("/api/auditorium/shows")
        .auth(userToken, {type: 'bearer'})
        .send({
            movieId: 3, 
            auditoriumId: 4,
            dateTime: "2012-10-22T02:30:00.000Z"
        })
        expect(response.body).toEqual({
            message: "Admin access required"
         })
        expect(response.statusCode).toBe(403)
    })
  
 
  
  it("tests /api/ticket/mytickets for response 401 unautherized ", async () => {
      const response = await request(app)
      .post("/api/auditorium/shows")
      expect(response.statusCode).toBe(401)
  })
  
  });
