import React, { useEffect, useState } from "react";
import DeleteGame from "./DeleteGame";
import { fetchItem } from "../api/orderItems";
import ToggleDescription from "./ToggleDescription";

const Playstation = ({ allGames, token, setAllGames, customer, addedItem, setAddedItem }) => {
  const playstationGames = allGames.filter((game) =>
    game.system.includes("Playstation")
  );
  // Sort games alphabetically
  playstationGames.sort((a, b) => {
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
    const newItem = await fetchItem(
      customer.id,
      productId,
      quantity,
      originalPrice,
      token
    );
    setAddedItem(!addedItem)
  };

  return (
    <section>
      <img id="pgame" src="https://gameoverpnx.files.wordpress.com/2023/03/1626364677_049220_1626364866_noticia_normal.jpg"></img>
      {playstationGames.length ? (
        playstationGames.map((game) => {
          const gameDescription = game.description;
          return (
            <article key={game.id}>
              <h2>{game.name}</h2>
              <img src={game.imageUrl} alt={game.name} />
              <ToggleDescription initialDescription={gameDescription} />
              <p>{game.price}</p>
              <button
                onClick={() => {
                  originalPrice = Number(game.price.substring(1));
                  handleSubmit(game.id);
                }}
              >
                Add To Cart
              </button>

            </article>
          );
        })
      ) : (
        <h1>No Games to display</h1>
      )}
    </section>
  );
};

export default Playstation;
