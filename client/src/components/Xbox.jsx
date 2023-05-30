import React, { useState } from "react";
import { fetchItem } from "../api/orderItems";
import DeleteGame from "./DeleteGame";
import ToggleDescription from "./ToggleDescription";

const Xbox = ({
  allGames,
  customer,
  token,
  setAllGames,
  setAddedItem,
  addedItem,
}) => {
  const xboxGames = allGames.filter((game) => game.system.includes("Xbox"));
  let originalPrice = 0;

  // Sort games alphabetically
  xboxGames.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });

  const handleSubmit = async (productId, originalPrice) => {
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
        id="xgame"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/XBOX_logo_2012.svg/1920px-XBOX_logo_2012.svg.png"
        alt="Xbox Logo"
      />
      {xboxGames.length ? (
        xboxGames.map((game) => {
          const gameDescription = game.description;

          return (
            <article className="card" key={game.id}>
              <img src={game.imageUrl} alt={game.name} />
              <h2>{game.name}</h2>
              <ToggleDescription initialDescription={gameDescription} />
              <p>{game.price}</p>
              <button
                className="addCart-button"
                onClick={() => {
                  const originalPrice = Number(game.price.substring(1));
                  handleSubmit(game.id, originalPrice);
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

export default Xbox;
