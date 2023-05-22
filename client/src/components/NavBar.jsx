import React from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const NavBar = ({ isLoggedIn, setToken, setIsLoggedIn, setCustomer }) => {
  return (
    <div>
      <div>
        <h1>Gamego</h1>
      </div>
      <Login
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        setCustomer={setCustomer}
      />
      <Register
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        setCustomer={setCustomer}
      />
      <nav>
        <NavLink to="/home">Home</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/logout">Logout</NavLink>
            <NavLink to="/account">Account</NavLink>
            <button>Cart</button>
          </>
        ) : (
          <>
            <button>Register</button> <button>Login</button>
          </>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
