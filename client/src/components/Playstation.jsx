import React from "react";

const Playstation = ({ allGames }) => {
  console.log(allGames);
  const playstationGames = allGames.filter((game) =>
    game.system.includes("Playstation")
  );
  console.log(playstationGames);
  return (
    <section>
      <h1 id="pgame">Playstation Games</h1>
      {playstationGames.length ? (
        playstationGames.map((game) => {
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
  );
};

export default Playstation;
