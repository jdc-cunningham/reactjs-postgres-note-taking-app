require('dotenv').config();
// require('dotenv').config({ path: '/full/custom/path/to/your/env/vars' })

// multiple db connections ready
// const Pool = require('pg').Pool;
// var pool = new Pool({
//     user: process.env.DB_USER,
//     host: 'localhost',
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.PORT
// });

const mysql = require('mysql2');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.MYSQL_PORT
});

pool.config.queryFormat = (query, values) => {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
};

module.exports = {
    pool,
    mysql
};