const mysql = require('mysql')

const connection = mysql.createPool({
 connectionLimit:10,
  host: '184.168.103.64',
  user: 'nuser',
  password: 'Nucleic@Admin$',
  database: 'NucleicMaster',
  connectTimeout  : 60 * 60 * 1000,
  acquireTimeout  : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
})


module.exports = connection;