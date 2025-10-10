import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    const conn = await mysql.createConnection({
      host: "sql100.infinityfree.com",
      user: "if0_40122454",
      password: "mthCbtBackend",
      database: "if0_40122454_cbt",
    });

    const [rows] = await conn.execute("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message });
  }
}
