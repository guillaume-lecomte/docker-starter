const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PWD,
  port: process.env.PG_PORT,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const getAllProducts = (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.log(err.stack);
      res.status(500).json(e);
    }
    client.query("SELECT * FROM products ORDER BY id ASC", (e, result) => {
      release();
      if (e) {
        console.log(e.stack);
        res.status(500).json(e);
      }
      res.status(200).json(result.rows);
    });
  });
};

module.exports = {
  getAllProducts,
};
