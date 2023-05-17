const client = require("./client");

const getAllGames = async () => {
  try {
    const { rows } = await client.query(`
  SELECT *
  FROM games;
`);
    return rows;
  } catch (error) {
    throw error;
  }
};
const getGameByTheirId = async (id) => {
  try {
    const result = await client.query(
      `
    SELECT * FROM products
    WHERE id = $1
    `,
      [id]
    );
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

const getGameByName = async (name) => {
  try {
    const {
      rows: [games],
    } = await client.query(
      `
        SELECT *
        FROM games
        WHERE name=$1;
        `,
      [name]
    );
    return games;
  } catch (error) {
    throw error;
  }
};
const createGame = async ({
  name,
  price,
  description,
  imageUrl,
  inventory,
}) => {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
        INSERT INTO products ( name, price, description, "imageUrl", inventory)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [name, price, description, imageUrl, inventory]
    );

    return game;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const attachConsoleToVideoGame = async () => {};

const updateGame = async ({ id, ...fields }) => {};
const deleteGame = async (id) => {};

module.exports = {
  getAllGames,
  createGame,
  getGameByTheirId,
  getGameByName,
  updateGame,
  deleteGame,
  attachConsoleToVideoGame,
};
