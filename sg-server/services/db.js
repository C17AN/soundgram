import mysql from 'mysql2/promise';
import dotenv from "dotenv"

dotenv.config()

async function query(sql, params) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
  const [results,] = await connection.execute(sql, params);

  return results;
}

export default query