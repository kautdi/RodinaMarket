const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    password:"vatnik1488",
    host:"localhost",
    port:5432,
    database:"sneakerMarket"
})

module.exports = pool;