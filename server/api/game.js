const express = require("express");
const gameRouter = express.Router();
const {
  getAllGames,
  getGameById,
  getGameByName,
  createGame,
} = require("../db/game");
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
  const { name, price, description, imageUrl, inventory, system } = req.body;

  try {
    const gameExist = await getGameByName(name);
    if (gameExist) {
      next({
        message: `Game ${name} already exists`,
      });
    } else {
      const gameCreated = await createGame({
        name,
        price,
        description,
        imageUrl,
        inventory,
        system,
      });
      console.log("able to hit the request statement");

      res
        .send({
          message: "Game was succesfully created",
          gameCreated,
        })
        .status(201);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = gameRouter;
