import React, { useState, useEffect } from "react";
import { fetchItem } from "../api/orderItems";

const Checkout = ({ customer, token }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const result = await fetchItem(customer.id, token);
        setOrderItems(result);

        let totalValue = result.reduce((game) => {
          return game.quantity * game.purchasePrice;
        }, 0);

        setTotal(totalValue);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderItems();
  }, [customer.id, token]);

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <h3>Customer Details</h3>
        <p>Name: {customer.name}</p>
        <p>Address: {customer.address}</p>
      </div>

      <div>
        <h3>Cart</h3>
        {orderItems.map((game, index) => (
          <div key={index}>
            <p>Product: {game.productId}</p>
            <p>Quantity: {game.quantity}</p>
            <p>Price: {game.purchasePrice}</p>
            <p>Subtotal: {game.quantity * game.purchasePrice}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Total</h3>
        <p>{total}</p>
      </div>
    </div>
  );
};

export default Checkout;
