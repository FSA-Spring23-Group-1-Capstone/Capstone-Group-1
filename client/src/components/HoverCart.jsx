import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrderItemsByOrderId } from "../api/orderItems";
import { ordersByCustomerEmail } from "../api/orders";
import { getGameByGameId } from "../api/games";

const HoverCart = ({ customer, token, allGames }) => {
  const [allItemsOrders, setAllItemsOrders] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const orderIdByCustomerEmail = async () => {
    const result = await ordersByCustomerEmail(customer.email);

    return result.id;
  };

  const getAllOrderItems = async () => {
    const result = await getAllOrderItemsByOrderId(
      await orderIdByCustomerEmail(),
      token
    );

    setAllItemsOrders(result);
  };

  const getAllGames = async () => {
    let cartItem = await Promise.all(
      allItemsOrders.map(
        async (order) => await getGameByGameId(order.productId, token)
      )
    );
    return cartItem;
  };
  const extractGames = async () => {
    setCartItems(await getAllGames());
  };

  console.log(allItemsOrders);

  return (
    <div>
      <button
        onClick={() => {
          extractGames();
          getAllOrderItems();
          setShowCart(!showCart);
        }}
      >
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
      {showCart ? (
        <div>
          {cartItems.map((game, index) => {
            return (
              <div key={game.id}>
                <h4>Name: {game.name}</h4>
                <h5>Price: {game.price}</h5>
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
