import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HoverCart = ({ customer, token, allGames, orderId, orderItems }) => {
  const [showCart, setShowCart] = useState(false);
  console.log("before", orderItems);

  const navigate = useNavigate();

  const handleCheckout = () => {
    setShowCart(false);
    navigate("/checkout");
  };
  return (
    <div>
      <button
        className="cart-button"
        onClick={() => {
          setShowCart(!showCart);
        }}
      >
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
      {showCart ? (
        <div className="hover-container">
          {orderItems.map((order, index) => {
            const currentGame = allGames.filter(
              (game) => game.id === order.productId
            );
            return (
              <div className="hovercart" key={currentGame[0].id}>
                <h4>Name: {currentGame[0].name}</h4>
                <h5>Price: {currentGame[0].price}</h5>
                <p>Quantity: {orderItems[index].quantity}</p>
              </div>
            );
          })}
          <button className="nav-button" onClick={handleCheckout}>
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
