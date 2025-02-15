import pg from "pg";
import chalk from "chalk";
import { config } from "dotenv";
config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export const connectDatabase = async () => {
  try {
    // connect to DB
    const client = await pool.connect();
    console.log(
      `${chalk.green("Server connected DB:")} ${chalk.yellow(client.database)}`
    );
    // Release DB
    client.release();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default pool;
