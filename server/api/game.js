const express = require("express");
const gameRouter = express.Router();
const {
  getAllGames,
  getGameById,
  getGameByName,
  createGame,
  deleteGame,
  updateGame,
} = require("../db/game");
const { requireAdmin, requireCustomer } = require("./utilities");

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
    next(error);
    throw error;
  }
});

gameRouter.patch("/:id/update", requireAdmin, async (req, res, next) => {
  const { id } = req.params;
  const { name, price, description, imageUrl, inventory, system } = req.body;
  const fields = {
    name,
    price,
    description,
    imageUrl,
    inventory,
    system,
  };
  const gameExist = await getGameById(id);
  if (gameExist) {
    if (!name) {
      fields.name = gameExist.name;
    }
    if (!description) {
      fields.description = gameExist.description;
    }
    if (!price) {
      fields.price = gameExist.price;
    }
    if (!imageUrl) {
      fields.imageUrl = gameExist.imageUrl;
    }
    if (!inventory) {
      fields.inventory = gameExist.inventory;
    }
    if (!system) {
      fields.system = gameExist.system;
    }
    const updatedGame = await updateGame(id, fields);
    res.send({
      updatedGame,
      message: "Game was updated",
    });
  } else {
    next({
      message: "Game does not exist",
    });
  }
});
 gameRouter.get("/:gameid/getgame", requireCustomer, async (req, res, next) => {
  const {gameid} = req.params;
  try {
  const game = await getGameById(gameid)
   if (game) {
    res.send({
      game,
      message: "game was retrieved by Id"
    })
   } else {
    next({
      message: "Game was not retrieved by Id"
    })
   }
} catch (error) {
  next (error);
  throw (error);
}
  
 }) 

module.exports = gameRouter;
