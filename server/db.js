const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "raksha18",
  host: "localhost",
  port: 5432,
  database: "hookclip_db",
});

module.exports = pool;
