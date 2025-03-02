// lib/db.js
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

export default pool;
