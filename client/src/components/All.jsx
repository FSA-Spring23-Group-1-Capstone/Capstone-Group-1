import React from "react";
import CreateGameForm from "./CreateGameForm";


const All = ({ allGames }) => {
  console.log(allGames);
  const Games = allGames;
  console.log(Games);
  return (
    <>
          <CreateGameForm token={token}/>
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
            </article>
          );
        })
      ) : (
        <h1>No Games to display</h1>
      )}
    </section>
</>
  );

};

export default All;
