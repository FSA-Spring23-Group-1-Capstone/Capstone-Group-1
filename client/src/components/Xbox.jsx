import React from "react";

const Xbox = ({ allGames }) => {
  console.log(allGames);
  const xboxGames = allGames.filter((game) => game.system.includes("Xbox"));
  console.log(xboxGames);
  return (
    <section>
      <h1>Xbox Games</h1>
      {xboxGames.length ? (
        xboxGames.map((game) => {
          return (
            <article key={game.id}>
              <h2>{game.name}</h2>
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

export default Xbox;
