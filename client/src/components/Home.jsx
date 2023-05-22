import React from "react";
import { NavLink } from "react-router-dom";

const Home = ({ allGames }) => {
  console.log(allGames);
  return (
    <div>
      <div className="xbox-container">
        <NavLink to="/Xbox">Xbox</NavLink>
      </div>
      <div className="playstation-container">
        <NavLink to="/Playstation">Playstation</NavLink>
      </div>
      <div className="nintendo-container">
        <NavLink to="/Nintendo">Nintendo</NavLink>
      </div>
      <div className="all-container">
        <NavLink to="/All">All Games</NavLink>
      </div>
    </div>
  );
};

export default Home;
