const mysql = require("mysql2");

var connection = mysql.createPool({
  user: 'root',
  host: 'localhost',
  database: 'rocci',
  // password: '',
  // ssl: { fake_flag_to_enable_tls: true },
});

module.exports = connection;
