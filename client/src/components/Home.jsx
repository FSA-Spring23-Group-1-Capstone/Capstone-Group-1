import React from "react";

const Home = ({ allGames }) => {
  console.log(allGames);
  return (
    <div>
      <div className="xbox-container">Xbox</div>
      <div className="playstation-container">Playstation</div>
      <div className="nintendo-container">Nintendo</div>
      <div className="all-container">All Games</div>
    </div>
  );
};

export default Home;
