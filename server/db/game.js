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

const getGameById = async (id) => {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
          SELECT *
          FROM games
          WHERE name=$1;
          `,
      [id]
    );
    return game;
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
  console,
}) => {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
        INSERT INTO products ( name, price, description, "imageUrl", inventory, console)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [name, price, description, imageUrl, inventory, console]
    );

    return game;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateGame = async (id, ...fields) => {
  const [inputs] = fields;
  const setString = Object.keys(inputs)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length > 0) {
    await client.query(
      `
    UPDATE products
    SET ${setString}
    WHERE id = ${id}
    RETURNING *
    `,
      Object.values(inputs)
    );
  }
};

const deleteGame = async (id) => {
  try {
    const {
      rows: [deletedGame],
    } = await client.query(
      `
        DELETE FROM products 
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return deletedGame;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllGames,
  createGame,
  getGameByName,
  updateGame,
  deleteGame,
  updateGame,
  getGameById,
};
