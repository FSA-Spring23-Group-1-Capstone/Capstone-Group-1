import React, { useState } from "react";
import CreateGameForm from "./CreateGameForm";
import DeleteGame from "./DeleteGame";
import { fetchItem } from "../api/orderItems";
import UpdateGameForm from "./UpdateGameForm";

const All = ({
  allGames,
  token,
  setAllGames,
  customer,
  addedItem,
  setAddedItem,
  orderId,
}) => {
  const [showCreate, setShowCreate] = useState(false);
  const Games = allGames;
  let originalPrice = 0;

  const [expandedGameId, setExpandedGameId] = useState(null);

  const handleGameClick = (gameId) => {
    setExpandedGameId(gameId === expandedGameId ? null : gameId);
  };
  // Sort games alphabetically
  allGames.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });

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

  const toggleCreateForm = () => {
    if (showCreate) {
      setShowCreate(false);
    } else {
      setShowCreate(true);
    }
  };
  console.log("GGGGG", customer);
  if (customer.admin) {
    return (
      <>
        <button onClick={toggleCreateForm}>Toggle Create Game Form</button>
        {showCreate ? (
          <CreateGameForm token={token} setAllGames={setAllGames} />
        ) : (
          <></>
        )}
        <section className="game-card">
          <img
            id="agame"
            src="https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/https://gameluster.com/wp-content/uploads/2022/12/Playstation-Nintendo-Xbox-logo.png"
          ></img>
          {Games.length ? (
            Games.map((game) => {
              return (
                <article key={game.id}>
                  <img className="image" src={game.imageUrl} alt={game.name} />
                  <h2>{game.name}</h2>
                  <p>{game.description} </p>
                  <p>{game.price}</p>
                  <button
                    onClick={() => {
                      originalPrice = Number(game.price.substring(1));
                      handleSubmit(game.id);
                    }}
                  >
                    +<i className="fa-solid fa-cart-shopping"></i>
                  </button>
                  <UpdateGameForm
                    token={token}
                    setAllGames={setAllGames}
                    gameId={game.id}
                  />
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
      </>
    );
  } else {
    return (
      <>
        <section className="game-card">
          <img
            id="agame"
            src="https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/https://gameluster.com/wp-content/uploads/2022/12/Playstation-Nintendo-Xbox-logo.png"
          ></img>
          {Games.length ? (
            Games.map((game) => {
              return (
                <article
                  className={`game ${
                    expandedGameId === game.id ? "expanded" : ""
                  }`}
                  key={game.id}
                  onClick={() => handleGameClick(game.id)}
                >
                  <div className="game-image">
                    <img
                      className="image"
                      src={game.imageUrl}
                      alt={game.name}
                    />
                  </div>
                  <div className="game-details">
                    <h2>{game.name}</h2>
                    {expandedGameId === game.id && (
                      <>
                        <p>{game.description}</p>
                        <p>{game.price}</p>
                        <button
                          className="nav-button"
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
              );
            })
          ) : (
            <h1>No Games to display</h1>
          )}
        </section>
      </>
    );
  }
};

export default All;
