import React, { useState } from "react";
import DeleteGame from "./DeleteGame";
import { fetchItem } from "../api/orderItems";
import ToggleDescription from "./ToggleDescription";

const Nintendo = ({
  allGames,
  setAllGames,
  token,
  customer,
  addedItem,
  setAddedItem,
}) => {
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
    const newItem = await fetchItem(
      customer.id,
      productId,
      quantity,
      originalPrice,
      token
    );
    setAddedItem(!addedItem);
  };

  return (
    <section>
      <img
        id="ngame"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/1920px-Nintendo.svg.png"
      ></img>
      {nintendoGames.length ? (
        nintendoGames.map((game) => {
          const gameDescription = game.description;
          return (
            <article key={game.id}>
              <img src={game.imageUrl} alt={game.name} />
              <h2>{game.name}</h2>
              <ToggleDescription initialDescription={gameDescription} />
              <p>{game.price}</p>
              <button
                onClick={() => {
                  originalPrice = Number(game.price.substring(1));
                  handleSubmit(game.id);
                }}
              >
                +<i className="fa-solid fa-cart-shopping"></i>
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

export default Nintendo;
