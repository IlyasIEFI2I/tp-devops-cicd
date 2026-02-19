const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'app',
  password: process.env.DB_PASSWORD || 'app',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'appdb'
});

async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('Database initialized successfully');
  } finally {
    client.release();
  }
}

async function getAllUsers() {
  const result = await pool.query('SELECT id, name FROM users ORDER BY id');
  return result.rows;
}

async function addUser(name) {
  const result = await pool.query(
    'INSERT INTO users (name) VALUES ($1) RETURNING id, name',
    [name]
  );
  return result.rows[0];
}

async function closePool() {
  await pool.end();
}

module.exports = {
  pool,
  initDb,
  getAllUsers,
  addUser,
  closePool
};
