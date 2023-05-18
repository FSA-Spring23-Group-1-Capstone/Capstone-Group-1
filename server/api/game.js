const express = require("express");
const gameRouter = express.Router();
const { getAllGames } = require("../db/game");

gameRouter.get("/", async (req, res, next) => {
  try {
    const allGames = await getAllGames();
    console.log(allGames);
    if (allGames !== null) {
      res.send(allGames);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});
module.exports = gameRouter;
