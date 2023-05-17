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

const getConsoleById = async (id) => {
  try {
    const {
      rows: [console],
    } = await client.query(
      `
        SELECT *
        FROM console
        WHERE id=$1;
        `,
      [id]
    );
    return console;
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

const getConsoleByName = async (name) => {
  try {
    const {
      rows: [console],
    } = await client.query(
      `
        SELECT *
        FROM console
        WHERE name=$1;
        `,
      [name]
    );
    return console;
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
        INSERT INTO product( name, price, description, imageUrl, inventory)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `,
      [name, price, description, imageUrl, inventory]
    );
    return game;
  } catch (error) {
    throw error;
    console.log(error);
  }
};

const updateGame = async ({ id, ...fields }) => {};
const deleteGame = async (id) => {};
