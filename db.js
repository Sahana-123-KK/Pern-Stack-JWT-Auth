const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    password:"sahana",
    host:"localhost",
    port:5432,
    database:"jwttutorial"
})


module.exports = pool