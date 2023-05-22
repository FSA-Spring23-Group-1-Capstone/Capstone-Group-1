import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar, Login, Register, Home } from "./components";

import { getMe } from "./api/customers";
import { getAllGames } from "./api/games";

function App() {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const getInitialData = async () => {
      if (token) {
        const me = await getMe(token);
        setUser(me);
        setIsLoggedIn(true);
      }
    };

    const getAllProducts = async () => {
      const data = await getAllGames();
      setAllGames(data);
    };
    getAllProducts();
    getInitialData();
  }, []);

  return (
    <div className="App">
      <NavBar
        token={token}
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        setCustomer={setCustomer}
      />
      <Routes>
        <Route path="/home" element={<Home allGames={allGames} />} />
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              setCustomer={setCustomer}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              setCustomer={setCustomer}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
