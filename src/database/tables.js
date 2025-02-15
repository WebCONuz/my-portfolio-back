import pool from "./db.js";

export const createTables = async () => {
  try {
    const tables = [
      `CREATE TABLE IF NOT EXISTS portfolio (
            id SERIAL PRIMARY KEY, 
            project_name VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            project_info TEXT,
            project_link VARCHAR(255),
            is_active BOOLEAN DEFAULT true,
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )`,
    ];

    for (let table of tables) {
      await pool.query(table);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
