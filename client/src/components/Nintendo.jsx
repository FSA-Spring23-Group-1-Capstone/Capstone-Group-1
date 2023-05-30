import React, { useState } from "react";
import DeleteGame from "./DeleteGame";
import { fetchItem } from "../api/orderItems";

const Nintendo = ({
  allGames,
  setAllGames,
  token,
  customer,
  addedItem,
  setAddedItem,
  orderId,
}) => {
  const nintendoGames = allGames.filter((game) =>
    game.system.includes("Nintendo")
  );

  nintendoGames.sort((a, b) => a.name.localeCompare(b.name));

  let originalPrice = 0;

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
    <section>
      <img
        id="ngame"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/1920px-Nintendo.svg.png"
        alt="Nintendo Logo"
      />

      {nintendoGames.length ? (
        nintendoGames.map((game) => (
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
                    +<i className="fa-solid fa-cart-shopping"></i>
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

export default Nintendo;
