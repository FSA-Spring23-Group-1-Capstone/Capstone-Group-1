import React, { useState } from "react";
import { getAllOrderItemsByOrderId } from "../api/orderItems";
import { ordersByCustomerEmail } from "../api/orders";

const HoverCart = ({ customer, token }) => {
  const [allItemsOrders, setAllItemsOrders] = useState([]);

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
  console.log(allItemsOrders);

  return (
    <div>
      <button
        onMouseOver={() => {
          getAllOrderItems();
        }}
      >
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
};

export default HoverCart;
