import React from "react";

const Nintendo = ({ allGames }) => {
  console.log(allGames);
  const nintendoGames = allGames.filter((game) =>
    game.system.includes("Nintendo")
  );
  console.log(nintendoGames);
  return (
    <section>
      <h1 id="ngame">Nintendo Games</h1>
      {nintendoGames.length ? (
        nintendoGames.map((game) => {
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

export default Nintendo;
