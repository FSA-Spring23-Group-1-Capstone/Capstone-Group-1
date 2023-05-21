const express = require("express");
const gameRouter = express.Router();
const {
  getAllGames,
  getGameById,
  getGameByName,
  createGame,
  deleteGame,
} = require("../db/game");
const requireAdmin = require("./utilities");

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

gameRouter.post("/create", requireAdmin, async (req, res, next) => {
  const { name, price, description, imageUrl, inventory, system } = req.body;

  try {
    const gameExist = await getGameByName(name);
    if (gameExist) {
      console.log("Game already exist");
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

gameRouter.delete("/:id/delete", requireAdmin, async (req, res, next) => {
  const gameId = req.params.id;
  try {
    const gameExist = await getGameById(+gameId);

    if (gameExist) {
      const deletedGame = await deleteGame(gameId);
      res.send({
        deletedGame,
        message: "Game was deleted",
      });
    } else {
      next({
        message: "Game does not exist",
      });
    }
  } catch (error) {
    throw error;
  }
});
module.exports = gameRouter;
