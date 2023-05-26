import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HoverCart = ({ customer, token, allGames, orderId, orderItems }) => {
  const [showCart, setShowCart] = useState(false);
  console.log("before", orderItems)
  
  const navigate = useNavigate();
  
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
          {orderItems.map((order, index) => {
            const currentGame = allGames.filter(
              (game) => game.id === order.productId
            );
            return (
              <div key={currentGame[0].id}>
                <h4>Name: {currentGame[0].name}</h4>
                <h5>Price: {currentGame[0].price}</h5>
                <p>Quantity: {orderItems[index].quantity}</p>
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
