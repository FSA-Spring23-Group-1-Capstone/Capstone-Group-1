import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  NavBar,
  Login,
  Register,
  Home,
  Xbox,
  Playstation,
  Nintendo,
  All,
} from "./components";

import { getMe } from "./api/customers";
import { getAllGames } from "./api/games";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const getInitialData = async () => {
      if (token) {
        const me = await getMe(token);
        console.log("HHHHHHHH", me);
        setCustomer(me);
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
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} /> */}
        <Route
          path="/Xbox"
          element={
            <Xbox allGames={allGames} customer={customer} token={token} />
          }
        />
        <Route
          path="/Playstation"
          element={<Playstation allGames={allGames} token={token} setAllGames={setAllGames}/>}
        />
        <Route path="/Nintendo" element={<Nintendo allGames={allGames} />} />
        <Route
          path="/All"
          element={<All allGames={allGames} token={token} setAllGames={setAllGames} />}
        />
      </Routes>
    </div>
  );
}

export default App;
