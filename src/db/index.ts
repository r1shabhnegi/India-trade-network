import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

// Create a connection pool optimized for high concurrency
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 20,
  waitForConnections: true,
  queueLimit: 30,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 10000,
  idleTimeout: 60000,
});

export const db = drizzle(pool);
