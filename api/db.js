// /api/db.js
import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,      // From Railway
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  });
  return connection;
}
