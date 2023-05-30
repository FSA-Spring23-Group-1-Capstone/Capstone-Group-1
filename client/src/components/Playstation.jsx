import React, { useEffect, useState } from "react";
import DeleteGame from "./DeleteGame";
import { fetchItem } from "../api/orderItems";

const Playstation = ({ allGames, token, setAllGames, customer, addedItem, setAddedItem }) => {
  const playstationGames = allGames.filter((game) => game.system.includes("Playstation"));

  // Sort games alphabetically
  playstationGames.sort((a, b) => a.name.localeCompare(b.name));

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

  const [expandedGameId, setExpandedGameId] = useState(null);

  const handleGameClick = (gameId) => {
    setExpandedGameId(gameId === expandedGameId ? null : gameId);
  };

  return (
    <section>
      <img
        id="pgame" src="https://gameoverpnx.files.wordpress.com/2023/03/1626364677_049220_1626364866_noticia_normal.jpg" alt="Playstation Games"/>
      {playstationGames.length ? (
        playstationGames.map((game) => (
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

export default Playstation;
