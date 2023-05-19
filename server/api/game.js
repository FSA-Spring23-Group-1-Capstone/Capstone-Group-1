const express = require("express");
const gameRouter = express.Router();
const { getAllGames, getGameById, getGameByName } = require("../db/game");
const requireCustomer = require("./utilities");

gameRouter.get("/", async (req, res, next) => {
  try {
    const allGames = await getAllGames();
    console.log(allGames);
    if (allGames !== null) {
      res.send(allGames).status(200);
    } else {
      next({
        message: "Unable to find games!",
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

gameRouter.post("/create", requireCustomer, async (req, res, next) => {
  const gameName = req.body.name;
  console.log(gameName);
  const game = await getGameByName(gameName);
  console.log(game);
});
module.exports = gameRouter;
