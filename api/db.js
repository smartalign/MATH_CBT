// api/db.js
import mysql from "mysql2/promise";

/**
 * Create a connection pool and cache it on the global object.
 * This avoids creating a new pool on every serverless invocation
 * (good practice on Vercel / serverless platforms).
 */
const pool = global.__mysqlPool || mysql.createPool({
  host: process.env.DB_HOST,       // e.g. sql100.infinityfree.com or your Planetscale host
  user: process.env.DB_USER,       // DB username
  password: process.env.DB_PASS,   // DB password
  database: process.env.DB_NAME,   // DB name
  waitForConnections: true,
  connectionLimit: 10,             // tune for your use-case
  queueLimit: 0,
  // If using Planetscale you may need SSL:
  // ssl: { rejectUnauthorized: true }
});

if (!global.__mysqlPool) {
  global.__mysqlPool = pool;
}

export default pool;
