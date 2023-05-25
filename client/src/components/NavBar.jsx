import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HoverCart from "./HoverCart";

const NavBar = ({
  isLoggedIn,
  setToken,
  setIsLoggedIn,
  setCustomer,
  customer,
  token,
  allGames,
}) => {
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
        <NavLink to="/home" id="home">
          Home
        </NavLink>
        <select onChange={handleChange} id="drop">
          <option value="/home">Select</option>
          <option value="/Xbox">Xbox</option>
          <option value="/Playstation">Playstation</option>
          <option value="/Nintendo">Nintendo</option>
        </select>
        {isLoggedIn ? (
          <>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCustomer("");
                setToken("");
                navigate("/home");
                localStorage.removeItem("token");
              }}
            >
              Logout
            </button>
            <NavLink to="/account" id="account">
              Account
            </NavLink>
            <HoverCart customer={customer} token={token} allGames={allGames} />
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
