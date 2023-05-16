const client = require("./client");

const getAllGames = async () => {};

const getAllConsoles = async () => {};

const getConsoleById = async (id) => {};

const getGameByName = async (name) => {};

const getConsoleByName = async (name) => {};

const createListing = async ({
  name,
  price,
  description,
  url,
  inventory,
  ...systemId
}) => {};

const updateListing = async ({ id, ...fields }) => {};
const deleteListing = async (id) => {};
