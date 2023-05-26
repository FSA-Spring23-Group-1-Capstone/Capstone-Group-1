import React, { useState } from "react";
import CreateGameForm from "./CreateGameForm";
import DeleteGame from "./DeleteGame";
import { fetchItem } from "../api/orderItems";
import UpdateGameForm from "./UpdateGameForm";
import ToggleDescription from "./ToggleDescription";

const All = ({ allGames, token, setAllGames, customer, addedItem, setAddedItem }) => {
  const [showCreate, setShowCreate] = useState(false);
  const Games = allGames;
  let originalPrice = 0;

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
        <img id="agame" src="https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/https://gameluster.com/wp-content/uploads/2022/12/Playstation-Nintendo-Xbox-logo.png"></img>
          {Games.length ? (
            Games.map((game) => {
              return (
                <article key={game.id}>
                  <img src={game.imageUrl} alt={game.name} />
                  <h2>{game.name}</h2>
                  <ToggleDescription initialDescription={game.description} />
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
          <img id="agame" src="https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_webp/https://gameluster.com/wp-content/uploads/2022/12/Playstation-Nintendo-Xbox-logo.png"></img>
          {Games.length ? (
            Games.map((game) => {
              return (
                <article key={game.id}>
                  <img src={game.imageUrl} alt={game.name} />
                  <h2>{game.name}</h2>
                  <ToggleDescription initialDescription={game.description} />
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
