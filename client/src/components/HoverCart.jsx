import React, { useState } from "react";
import { getAllOrderItemsByOrderId } from "../api/orderItems";
import { ordersByCustomerEmail } from "../api/orders";
const HoverCart = ({ customer, token, allGames }) => {
  const [allItemsOrders, setAllItemsOrders] = useState([]);
  const [showCart, setShowCart] = useState(false);

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

  console.log("All items order: ", allItemsOrders);
  const customersCart = [];
  if (!allItemsOrders.length) {
    console.log("no cart");
  } else {
    for (let i = 0; i < allGames.length; i++) {
      if (allGames[i].id === allItemsOrders[i].productId) {
        customersCart.push(allGames[i]);
      }
    }
  }
  console.log("All games", allGames);
  console.log("Customer add games", allItemsOrders);
  console.log("customers cart", customersCart);

  return (
    <div>
      <button
        onClick={() => {
          getAllOrderItems();
          setShowCart(!showCart);
        }}
      >
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
      {showCart
        ? customersCart.map((game) => {
            return (
              <div key={game.id}>
                <h3>{game.name}</h3>
                <h5>{game.price}</h5>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default HoverCart;
