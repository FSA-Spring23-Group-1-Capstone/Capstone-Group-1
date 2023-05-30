import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HoverCart from "./HoverCart";
import logo from "../assets/GameGo-1.png";

const NavBar = ({
  isLoggedIn,
  setToken,
  setIsLoggedIn,
  setCustomer,
  customer,
  token,
  allGames,
  orderItems,
}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    navigate(e.target.value);
  };
  return (
    <header className="header-container">
      <NavLink id="logo" to="/home">
        <img src={logo} alt="Logo" />
      </NavLink>
      <nav className="button-container">
        <select onChange={handleChange} className="nav-button">
          <option value="/home">System</option>
          <option value="/Xbox">Xbox</option>
          <option value="/Playstation">Playstation</option>
          <option value="/Nintendo">Nintendo</option>

          <option value="/All">All</option>
        </select>
        {isLoggedIn ? (
          <>
            <button
              className="nav-button"
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
            <NavLink to="/account" className="nav-button">
              Account
            </NavLink>
            <HoverCart
              customer={customer}
              token={token}
              allGames={allGames}
              orderItems={orderItems}
            />
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
                  className="nav-button"
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
                className="nav-button"
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
                  className="nav-button"
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
                className="nav-button"
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
