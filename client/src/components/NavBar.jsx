import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ isLoggedIn }) => {
  return (
    <div>
      <div>
        <h1>Gamego</h1>
      </div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/logout">Logout</NavLink>
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/cart">Cart</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>{" "}
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
