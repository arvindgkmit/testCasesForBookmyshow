const request = require('supertest');
const app = require('../app');

let token = "eyJhbGciOiJIUzI1NiJ9.Mw.7lgYa5GpLnFasIFD8Leet3arTtYx27Df8Gau6dhIEYg";

describe("all ticket api  test cases ", () => {
    it("tests /api/ticket/tickets for response 200 ok", async () => {
        const response = await request(app)
        .get("/api/ticket/tickets")
        .auth(token, {type: 'bearer'})
        expect(response.statusCode).toBe(200)
    })
  

  
  it("tests /api/ticket/tickets for response 401 unautherized ", async () => {
      const response = await request(app)
      .get("/api/ticket/tickets")
      .send({
        movieName: "black adam"
      })
  
      expect(response.body).toEqual({
     
      })
      expect(response.statusCode).toBe(401)
  })
  
  });




  describe("book ticket api  test cases ", () => {
    it("tests /api/ticket/booktickets for response 200 ok", async () => {
        const response = await request(app)
        .post("/api/ticket/booktickets")
        .auth(token, {type: 'bearer'})
        .send({
            seatId: 11,
            userId: 2,
            auditoriumId: 2,
            showId: 2,
            movieId: 1,
        })
        expect(response.body).toEqual({
            message: "Ticket booked  successfully"
         })
        expect(response.statusCode).toBe(200)
    })
  
    it("tests /api/ticket/tickets for response 400 bad request ", async () => {
        const response = await request(app)
        .post("/api/ticket/booktickets")
        .auth(token, {type: 'bearer'})
        .send({
          seatId: 10,
          userId: 2,
          auditoriumId: 2,
          showId: 2,
          movieId: 3
        })
    
        expect(response.body).toEqual({
            message: "Seat is already booked"
        })
        expect(response.statusCode).toBe(400)
    })
  
  it("tests /api/ticket/tickets for response 401 unautherized ", async () => {
      const response = await request(app)
      .post("/api/ticket/booktickets")
      .send({
        seatId: 10,
        userId: 2,
        auditoriumId: 2,
        showId: 2,
        movieId: 2
      })
  
      expect(response.body).toEqual({
     
      })
      expect(response.statusCode).toBe(401)
  })
  
  });



  describe("my ticket api  test cases ", () => {
    it("tests /api/ticket/mytickets for response 200 ok", async () => {
        const response = await request(app)
        .get("/api/ticket/mytickets/2")
        .auth(token, {type: 'bearer'})
        expect(response.body).toEqual({
            data: [
                {
                    id: 20,
                    movieName: "ps-1",
                    dateTime: "2012-10-22T02:30:00.000Z",
                    auditoriumName: "Lake City Mall",
                    name: "user"
                },
                {
                    id: 25,
                    movieName: "ps-1",
                    dateTime: "2012-10-22T02:30:00.000Z",
                    auditoriumName: "Celebration mall",
                    name: "user"
                }
            ]
         })
        expect(response.statusCode).toBe(200)
    })
  
 
  
  it("tests /api/ticket/mytickets for response 401 unautherized ", async () => {
      const response = await request(app)
      .get("/api/ticket/mytickets/2")

      expect(response.statusCode).toBe(401)
  })
  
  });


  describe("available tickets api  test cases ", () => {
    it("tests /api/ticket/availabletickets for response 200 ok", async () => {
        const response = await request(app)
        .get("/api/ticket/availabletickets")
        .auth(token, {type: 'bearer'})
        expect(response.statusCode).toBe(200)
    })
  
  });