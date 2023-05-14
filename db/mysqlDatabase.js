const mysql = require("mysql2");

var connection = mysql.createPool({
  user: 'root',
  host: 'srv-captain--roccidb-db',
  database: 'rocci',
  password: '23yGqcMk1@ye',
  // ssl: { fake_flag_to_enable_tls: true },
});

module.exports = connection;
