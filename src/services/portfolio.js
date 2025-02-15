import pool from "../database/db.js";

export default {
  getAll: async () => {
    const data = await pool.query("SELECT * FROM portfolio");
    return data.rows;
  },
  getByQuery: async (query) => {
    return query;
  },
  getOne: async (id) => {
    const data = await pool.query("SELECT * FROM portfolio WHERE id=$1", [id]);
    return data.rows[0];
  },
  create: async (data) => {
    const newData = await pool.query(
      "INSERT INTO portfolio (project_name, thumbnail, category, project_info, project_link) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        data.project_name,
        data.thumbnail,
        data.category,
        data.project_info,
        data.project_link,
      ]
    );
    return newData.rows[0];
  },
  update: async (id, data) => {
    const editData = await pool.query(
      "UPDATE portfolio SET project_name=$1, thumbnail=$2, category=$3, project_info=$4, project_link=$5, is_active=$6, updatedAt=$7 WHERE id=$8 RETURNING id",
      [
        data.project_name,
        data.thumbnail,
        data.category,
        data.project_info,
        data.project_link,
        data.is_active,
        new Date(),
        id,
      ]
    );
    return editData.rows[0].id;
  },
  delete: async (id) => {
    const data = await pool.query(
      "DELETE FROM portfolio WHERE id=$1 RETURNING id",
      [id]
    );
    return data.rows[0].id;
  },
};
