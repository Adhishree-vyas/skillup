import db from "../config/db.js";
export const findRecord = async (table, condition) => {
  try {
    const query = `SELECT * FROM ${table} WHERE ${condition}`;
    const [rows] = await db.query(query);
    return rows; // returns array of matched records
  } catch (error) {
    throw error; // pass error to controller
  }
};
export const updateRecord = async (table, payload, where, params = []) => {
  const keys = Object.keys(payload)
    .map((key) => `${key} = ?`)
    .join(", ");

  const values = Object.values(payload);

  const query = `UPDATE ${table} SET ${keys} WHERE ${where}`;
  return db.execute(query, [...values, ...params]);
};

export const createRecord = async (table, data) => {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = `INSERT INTO ${table} (${keys.join(",")}) VALUES (${keys
      .map(() => "?")
      .join(",")})`;

    const [result] = await db.query(query, values);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

export const getById = async (table, id) => {
  try {
    const query = `SELECT * FROM ${table} WHERE id = ?`;
    const [rows] = await db.query(query, [id]);
    return rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const updateById = async (table, id, data) => {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = `UPDATE ${table} SET ${keys
      .map((key) => `${key} = ?`)
      .join(", ")} WHERE id = ?`;

    const [result] = await db.query(query, [...values, id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (table, id) => {
  try {
    const query = `DELETE FROM ${table} WHERE id = ?`;
    const [result] = await db.query(query, [id]);

    return result.affectedRows > 0; // true = deleted, false = not found
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
};
