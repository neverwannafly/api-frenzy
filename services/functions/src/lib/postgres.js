const { Pool } = require('pg');

let sslOptions = undefined;
if (process.env.NODE_ENV === 'production') {
  sslOptions = { rejectUnauthorized: false };
}

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  ssl: sslOptions
});

const executeQuery = async (query, args) => {
  let result = [];
  let success = false;
  const client = await pool.connect();
  try {
    const res = await client.query(query, args);
    result =  res.rows;
    success = true;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }

  return { success, result };
};

module.exports = { executeQuery };
