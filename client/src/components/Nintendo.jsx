import React, { useState } from "react";
import DeleteGame from "./DeleteGame";
import { fetchItem } from "../api/orderItems";

const Nintendo = ({ allGames, setAllGames, token, customer }) => {
  const nintendoGames = allGames.filter((game) =>
    game.system.includes("Nintendo")
  );
  // Sort games alphabetically
  nintendoGames.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });

  const [currentPrice, setCurrentPrice] = useState("");
  let originalPrice = 0;

  const handleSubmit = async (productId) => {
    const quantity = 1;
    const addedItem = await fetchItem(
      customer.id,
      productId,
      quantity,
      originalPrice,
      token
    );
    console.log(addedItem);
  };

  return (
    <section>
      <h1 id="ngame">Nintendo Games</h1>
      {nintendoGames.length ? (
        nintendoGames.map((game) => {
          return (
            <article key={game.id}>
              <h2>{game.name}</h2>
              <img src={game.imageUrl} alt={game.name} />
              <p>{game.description}</p>
              <p>{game.price}</p>
              <button
                onClick={() => {
                  originalPrice = Number(game.price.substring(1));
                  handleSubmit(game.id);
                }}
              >
                Add To Cart
              </button>
              <DeleteGame
                gameId={game.id}
                token={token}
                setAllGames={setAllGames}
                allGames={allGames}
              />
            </article>
          );
        })
      ) : (
        <h1>No Games to display</h1>
      )}
    </section>
  );
};

export default Nintendo;
