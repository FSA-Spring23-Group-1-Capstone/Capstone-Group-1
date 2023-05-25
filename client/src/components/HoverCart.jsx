import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrderItemsByOrderId } from "../api/orderItems";
import { ordersByCustomerEmail } from "../api/orders";
import { getGameByGameId } from "../api/games";

const HoverCart = ({ customer, token, allGames }) => {
  const [allItemsOrders, setAllItemsOrders] = useState([]);
  const [showCart, setShowCart] = useState(false);
  console.log("before", allItemsOrders)
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const getCustomerOrder = async () => {
      const customerOrder = await ordersByCustomerEmail(customer.email);
      console.log("customerOrder: ", customerOrder)
      const fetchedOrderItems = await getAllOrderItemsByOrderId(
        customerOrder.id,
        token
        );
        console.log("fetchedOrderItems: ", fetchedOrderItems)
      setAllItemsOrders(fetchedOrderItems);
    };
    
    getCustomerOrder();
  }, [showCart]);
  
  console.log("after", allItemsOrders)
  return (
    <div>
      <button
        onClick={() => {
          setShowCart(!showCart);
        }}
      >
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
      {showCart ? (
        <div>
          {allItemsOrders.map((order, index) => {
            const currentGame = allGames.filter(
              (game) => game.id === order.productId
            );
            return (
              <div key={currentGame[0].id}>
                <h4>Name: {currentGame[0].name}</h4>
                <h5>Price: {currentGame[0].price}</h5>
                <p>Quantity: {allItemsOrders[index].quantity}</p>
              </div>
            );
          })}
          <button
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HoverCart;
