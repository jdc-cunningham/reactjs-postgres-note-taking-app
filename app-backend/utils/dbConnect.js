require('dotenv').config();

// multiple db connections ready
const Pool = require('pg').Pool;
var pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.PORT
});

module.exports = pool;