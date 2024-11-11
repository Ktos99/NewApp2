const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "Szariczkowaty2@",
    host: "localhost",
    port: 5432,
    database: "testdb123"
});

module.exports = pool;