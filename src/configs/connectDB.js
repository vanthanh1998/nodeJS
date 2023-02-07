// get the client
// const mysql = require('mysql2'); => code old
import mysql from 'mysql2'; // => code new

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nodejs_basic'
});

export default connection;