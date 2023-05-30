import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HoverCart from "./HoverCart";
import logo from "../assets/GameGo-1.png";
import { authenticateNewCustomer } from "../api/authentication";

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
      <nav>
        {/* <NavLink to="/home" id="home">
          Home
        </NavLink> */}
        <select onChange={handleChange} id="drop">
          <option value="/home">System</option>
          <option value="/Xbox">Xbox</option>
          <option value="/Playstation">Playstation</option>
          <option value="/Nintendo">Nintendo</option>

          <option value="/All">All</option>
        </select>
        {isLoggedIn ? (
          <>
            <NavLink to="/account" id="account">
              Account
            </NavLink>
            <HoverCart
              customer={customer}
              token={token}
              allGames={allGames}
              orderItems={orderItems}
            />
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
            <button
              onClick={() => {
                const registerDummy = async () => {
                  const dummy = {
                    name: "John Doe",
                    email: "john@gmail.com",
                    password: "123456789",
                    address: "123 Lane Street",
                  };
                  const dummyData = await authenticateNewCustomer(dummy);
                  if (dummyData.token) {
                    setToken(dummyData.token);
                    setIsLoggedIn(true);
                    setCustomer(dummyData.customer);
                  }
                };
                registerDummy();
              }}
            >
              Demo
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
