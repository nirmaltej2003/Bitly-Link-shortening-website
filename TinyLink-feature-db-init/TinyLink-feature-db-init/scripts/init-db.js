// Ensure a WebSocket implementation is available for @neondatabase/serverless
try {
  // ws provides a WebSocket constructor compatible with the library
  global.WebSocket = global.WebSocket || require('ws');
} catch (e) {
  // If ws is not installed, the library may still work in some environments.
}

const { Pool } = require('@neondatabase/serverless');

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('Please set DATABASE_URL in environment or .env.local');
  process.exit(1);
}

const pool = new Pool({ connectionString: url });

const SQL = `
CREATE TABLE IF NOT EXISTS links (
  code TEXT PRIMARY KEY,
  target_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT now()
);
`;

(async () => {
  try {
    await pool.query(SQL);
    console.log('✅ links table ensured');
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('DB init error:', err);
    try { await pool.end(); } catch (e) { }
    process.exit(1);
  }
})();
