const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
//Creating database connection with mysql
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    password: "Arvind@gkmit#123",
    database: process.env.DATABASE,
    port:process.env.DATABASE_PORT
});
module.exports=db;