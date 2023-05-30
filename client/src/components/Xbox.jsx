import React, { useState } from "react";
import { fetchItem } from "../api/orderItems";
import DeleteGame from "./DeleteGame";

const Xbox = ({
  allGames,
  customer,
  token,
  setAllGames,
  setAddedItem,
  addedItem,
  orderId
}) => {
  const xboxGames = allGames.filter((game) => game.system.includes("Xbox"));
  let originalPrice = 0;

  xboxGames.sort((a, b) => a.name.localeCompare(b.name));

  const handleSubmit = async (productId) => {
    const quantity = 1;
    const newItem = await fetchItem(
      customer.id,
      productId,
      quantity,
      originalPrice,
      token,
      orderId
    );
    setAddedItem(!addedItem);
  };

  const [expandedGameId, setExpandedGameId] = useState(null);

  const handleGameClick = (gameId) => {
    setExpandedGameId(gameId === expandedGameId ? null : gameId);
  };

  return (
    <section className="game-card">
      <img
        id="xgame"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/XBOX_logo_2012.svg/1920px-XBOX_logo_2012.svg.png"
        alt="Xbox Logo"
      />
      {xboxGames.length ? (
        xboxGames.map((game) => (
          <article
            className={`game ${expandedGameId === game.id ? "expanded" : ""}`}
            key={game.id}
            onClick={() => handleGameClick(game.id)}
          >
            <div className="game-image">
              <img className="image" src={game.imageUrl} alt={game.name} />
            </div>
            <div className="game-details">
              <h2>{game.name}</h2>
              {expandedGameId === game.id && (
                <>
                  <p>{game.description}</p>
                  <p>{game.price}</p>
                  <button
                    onClick={() => {
                      originalPrice = Number(game.price.substring(1));
                      handleSubmit(game.id);
                    }}
                  >
                    <i className="fa-solid fa-cart-shopping">+</i>
                  </button>
                </>
              )}
            </div>
          </article>
        ))
      ) : (
        <h1>No Games to display</h1>
      )}
    </section>
  );
};

export default Xbox;
