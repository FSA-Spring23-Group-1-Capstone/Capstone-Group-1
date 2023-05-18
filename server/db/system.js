const client = require("./client");
const getAllConsoles = async () => {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM consoles;
  `);
    return rows;
  } catch (error) {
    throw error;
  }
};
const createConsole = async ({ name, price }) => {
  try {
    const {
      rows: [console],
    } = await client.query(
      `
      INSERT INTO system(name, price)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [name, price]
    );
    return console;
  } catch (error) {
    throw error;
  }
};
const getConsoleByName = async ({ name }) => {
  try {
    const {
      rows: [console],
    } = await client.query(
      `
          SELECT *
          FROM system
          WHERE name=$1;
          `,
      [name]
    );
    return console;
  } catch (error) {
    throw error;
  }
};
const updateConsole = async (id, ...fields) => {
  const [input] = fields;
  const setString = Object.keys(input)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length > 0) {
    await client.query(
      `
    UPDATE system
    SET ${setString}
    WHERE id = ${id}
    `,
      Object.values(input)
    );
  }
};
const deleteConsole = async (id) => {
  try {
    const {
      rows: [deleteConsole],
    } = await client.query(
      `
    DELETE FROM system
    WHERE id = $1
    RETURNING*`,
      [id]
    );
    return deleteConsole;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createConsole,
  getConsoleByName,
  getAllConsoles,
  deleteConsole,
  updateConsole,
};
