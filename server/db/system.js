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
const createConsole = async ({ name }) => {
  try {
    const {
      rows: [console],
    } = await client.query(
      `
      INSERT INTO system(name)
      VALUES ($1)
      RETURNING *;
      `,
      [name]
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
module.exports = {
  createConsole,
  getConsoleByName,
  getAllConsoles,
};
