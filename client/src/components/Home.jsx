import React from "react";
import { NavLink } from "react-router-dom";
import { authenticateNewCustomer } from "../api/authentication";

const Home = ({ setCustomer, setIsLoggedIn, setToken }) => {
  return (
    <div className="container">
      <div className="demo-container">
        <button
          className="demo-button"
          onClick={() => {
            const registerDemo = async () => {
              const demoUser = {
                name: "John Doe",
                email: "john@gmail.com",
                password: "12345",
                address: "123 Lane",
              };
              const registered = await authenticateNewCustomer(demoUser);
              console.log(registered);
              if (registered.token) {
                setToken(registered.token);
                setIsLoggedIn(true);
                setCustomer(registered.customer);
              }
            };
            registerDemo();
          }}
        >
          Demo
        </button>
      </div>
      <NavLink to="/Xbox" className="xbox-container">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/XBOX_logo_2012.svg/220px-XBOX_logo_2012.svg.png" />
        </div>
      </NavLink>
      <NavLink to="/Playstation" className="playstation-container">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/PlayStation_logo_and_wordmark.svg/250px-PlayStation_logo_and_wordmark.svg.png" />
        </div>
      </NavLink>

      <NavLink to="/Nintendo" className="nintendo-container">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/220px-Nintendo.svg.png" />
        </div>
      </NavLink>
      <NavLink to="/All" className="all-container">
        <div>
          <img src="data:image/png;base64,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" />
        </div>
      </NavLink>
    </div>
  );
};

export default Home;
