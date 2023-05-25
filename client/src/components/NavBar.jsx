import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HoverCart from "./HoverCart";
import logo from "../../public/assets/GameGo-1.png";

const NavBar = ({
  isLoggedIn,
  setToken,
  setIsLoggedIn,
  setCustomer,
  customer,
  token,
}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    navigate(e.target.value);
  };
  return (
    <header className="header-container">
      <div id="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <select onChange={handleChange}>
          <option value="/home">Select a brand</option>
          <option value="/Xbox">Xbox</option>
          <option value="/Playstation">Playstation</option>
          <option value="/Nintendo">Nintendo</option>
          <option value="/Checkout">Checkout</option>
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
            <NavLink to="/account">Account</NavLink>
            <HoverCart customer={customer} token={token} />
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
