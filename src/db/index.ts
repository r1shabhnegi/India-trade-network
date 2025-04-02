import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

let pool: mysql.Pool | null = null;

export function getConnectionPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri: process?.env?.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
}

export const db = drizzle(getConnectionPool());

// Function to test database connection
export async function testConnection() {
  try {
    const connection = await getConnectionPool().getConnection();
    connection.release();
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}
