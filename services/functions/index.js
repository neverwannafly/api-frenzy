const express = require('express');
const { exec } = require('child_process');
const { Pool } = require('pg');

const app = express();
const port = 6969;

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('Node.js server is running!');
});

app.post('/run-firecracker', async (req, res) => {
  // Example of spawning a Firecracker instance
  exec('firecracker --config-file <path-to-config>', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error}`);
        return res.status(500).send('Error spawning Firecracker instance');
    }
    console.log(`Output: ${stdout}`);
    res.send('Firecracker instance spawned!');
  });
});

app.get('/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM your_table');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying database');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
