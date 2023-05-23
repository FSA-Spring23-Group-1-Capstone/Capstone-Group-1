import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const NavBar = ({ isLoggedIn, setToken, setIsLoggedIn, setCustomer }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    navigate(e.target.value);
  };
  return (
    <header className="header-container">
      <div>
        <h1 id="title">GameGo</h1>
      </div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <select onChange={handleChange}>
          <option value="/home">Select a brand</option>
          <option value="/Xbox">Xbox</option>
          <option value="/Playstation">Playstation</option>
          <option value="/Nintendo">Nintendo</option>
        </select>
        {isLoggedIn ? (
          <>
            <NavLink to="/logout">Logout</NavLink>
            <NavLink to="/account">Account</NavLink>
            <button>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </>
        ) : (
          <>
            {showRegister ? (
              <>
                <Register
                  setToken={setToken}
                  setIsLoggedIn={setIsLoggedIn}
                  setCustomer={setCustomer}
                />
                <button
                  onClick={() => {
                    setShowRegister(!showRegister);
                    setShowLogin(false);
                  }}
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowRegister(!showRegister);
                  setShowLogin(false);
                }}
              >
                Register
              </button>
            )}
            {showLogin ? (
              <>
                <Login
                  setToken={setToken}
                  setIsLoggedIn={setIsLoggedIn}
                  setCustomer={setCustomer}
                />
                <button
                  onClick={() => {
                    setShowLogin(!showLogin);
                    setShowRegister(false);
                  }}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(!showLogin);
                  setShowRegister(false);
                }}
              >
                Login
              </button>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
