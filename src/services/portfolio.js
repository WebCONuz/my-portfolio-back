import pool from "../db/db.js";

export default {
  getAll: async () => {
    const data = await pool.query("SELECT * FROM portfolio");
    return data.rows;
  },

  create: (data) => {
    return {
      msg: "Create",
    };
  },

  getOne: async (id) => {
    const data = await pool.query("SELECT * FROM portfolio WHERE id=$1", [id]);
    return data.rows[0];
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

  delete: (id) => {
    console.log(`Data ws deleted, id: ${id}`);
  },
};
