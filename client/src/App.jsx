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
  Checkout,
  Account,
} from "./components";

import { getMe } from "./api/customers";
import { getAllGames } from "./api/games";
import { ordersByCustomerEmail } from "./api/orders";
import { getAllOrderItemsByOrderId } from "./api/orderItems";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customer, setCustomer] = useState({});
  const [allGames, setAllGames] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [addedItem, setAddedItem] = useState(false);
  const [allCustomerOrders, setAllCustomerOrders] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const data = await getAllGames();
      setAllGames(data);
      const theOrders = await ordersByCustomerEmail(customer.email);
      setAllCustomerOrders(theOrders);
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const resetOrders = async () => {
      const theOrders = await ordersByCustomerEmail(customer.email);
      setAllCustomerOrders(theOrders);
    };
    resetOrders();
  }, [orderId]);

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

  useEffect(() => {
    const getCustomerOrder = async () => {
      const theOrders = await ordersByCustomerEmail(customer.email);
      const cartNum = theOrders.filter(
        (order) => order.orderCompleted === false
      );
      setOrderId(cartNum[0].id);
      const fetchedOrderItems = await getAllOrderItemsByOrderId(
        cartNum[0].id,
        token
      );
      console.log("JJJJJJJ", fetchedOrderItems);
      setOrderItems(fetchedOrderItems);
    };

    getCustomerOrder();
  }, [addedItem]);

  return (
    <div className="App">
      <NavBar
        token={token}
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        setCustomer={setCustomer}
        isLoggedIn={isLoggedIn}
        customer={customer}
        allGames={allGames}
        orderItems={orderItems}
        orderId={orderId}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/account"
          element={
            <Account
              customer={customer}
              allCustomerOrders={allCustomerOrders}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              token={token}
              customer={customer}
              allGames={allGames}
              orderItems={orderItems}
              orderId={orderId}
              setOrderItems={setOrderItems}
              addedItem={addedItem}
              setOrderId={setOrderId}
            />
          }
        />

        <Route
          path="/Xbox"
          element={
            <Xbox
              allGames={allGames}
              customer={customer}
              token={token}
              setAllGames={setAllGames}
              addedItem={addedItem}
              setAddedItem={setAddedItem}
            />
          }
        />
        <Route
          path="/Playstation"
          element={
            <Playstation
              allGames={allGames}
              token={token}
              setAllGames={setAllGames}
              customer={customer}
              addedItem={addedItem}
              setAddedItem={setAddedItem}
            />
          }
        />
        <Route
          path="/Nintendo"
          element={
            <Nintendo
              allGames={allGames}
              token={token}
              setAllGames={setAllGames}
              customer={customer}
              addedItem={addedItem}
              setAddedItem={setAddedItem}
            />
          }
        />
        <Route
          path="/All"
          element={
            <All
              allGames={allGames}
              token={token}
              setAllGames={setAllGames}
              customer={customer}
              addedItem={addedItem}
              setAddedItem={setAddedItem}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
