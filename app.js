
const express = require('express')
const app = express();
const db = require('./db');
const port = 3000;

app.use(express.json())
// db.connect();

   db.connect((error)=>{
    if (error){
        console.log(error);
    }
     else{
        console.log("connected");
    }
  });

// // available routes
app.use('/api/auth', require('./api/Auth'));
app.use('/api/movies', require('./api/Movies'));
app.use('/api/auditorium', require('./api/Auditorium'));
app.use('/api/ticket', require('./api/Ticket'));

app.listen(port,  () => {
  console.log(`Example app listening on port 5000`)
})

module.exports = app;

