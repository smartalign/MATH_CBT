// /api/login.js
import { connectDB } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }

  const { username, password } = req.body;

  try {
    const conn = await connectDB();

    const [rows] = await conn.execute(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res.json({ success: false, message: "Invalid login" });
    }

    await conn.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
