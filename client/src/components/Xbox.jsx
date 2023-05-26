import React from "react";
import { useState } from "react";
import { fetchItem } from "../api/orderItems";
import DeleteGame from "./DeleteGame";

const Xbox = ({ allGames, customer, token, setAllGames }) => {
  let xboxGames = allGames.filter((game) => game.system.includes("Xbox"));

  // Sort games alphabetically
  xboxGames.sort((a, b) => {
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
      <h1 id="xgame">Xbox Games</h1>
      {xboxGames.length ? (
        xboxGames.map((game) => {
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

export default Xbox;
