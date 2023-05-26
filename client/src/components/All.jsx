import React, { useState } from "react";
import CreateGameForm from "./CreateGameForm";
import DeleteGame from "./DeleteGame";
import { fetchItem } from "../api/orderItems";
import UpdateGameForm from "./UpdateGameForm";

const All = ({ allGames, token, setAllGames, customer, addedItem, setAddedItem }) => {
  const [showCreate, setShowCreate] = useState(false);
  const Games = allGames;
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

  const toggleCreateForm = () => {
    if (showCreate) {
      setShowCreate(false);
    } else {
      setShowCreate(true);
    }
  };
console.log("GGGGG", customer)
  if (customer.admin) {
    return (
      <>
        <button onClick={toggleCreateForm}>Toggle Create Game Form</button>
        {showCreate ? (
          <CreateGameForm token={token} setAllGames={setAllGames} />
        ) : (
          <></>
        )}
        <section>
          <h1 id="agame">All Games</h1>
          {Games.length ? (
            Games.map((game) => {
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
        <section>
          <h1 id="agame">All Games</h1>
          {Games.length ? (
            Games.map((game) => {
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
