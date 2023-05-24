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
  const [customer, setCustomer] = useState({});
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const data = await getAllGames();
      setAllGames(data);
    };
    getAllProducts();
  }, []);


  useEffect(() => {
    const getInitialData = async () => {
      if (token) {
        const me = await getMe(token);

        setCustomer(me);
        setIsLoggedIn(true);
      }
    };
    getInitialData();
  }, [token]);


  return (
    <div className="App">
      <NavBar
        token={token}
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        setCustomer={setCustomer}
        isLoggedIn={isLoggedIn}
        customer={customer}
      />
      <Routes>
        <Route path="/home" element={<Home />} />
        {/*<Route path="/account" element={<Account />} />*/}
        <Route path="/checkout" />
        <Route
          path="/Xbox"
          element={
            <Xbox allGames={allGames} customer={customer} token={token} setAllGames={setAllGames}/>
          }
        />
        <Route
          path="/Playstation"
          element={<Playstation allGames={allGames} token={token} setAllGames={setAllGames} customer={customer}/>}
        />
        <Route 
          path="/Nintendo" 
          element={<Nintendo allGames={allGames}  token={token} setAllGames={setAllGames} customer={customer}/>} />
        <Route
          path="/All"
          element={<All allGames={allGames} token={token} setAllGames={setAllGames} customer={customer}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
