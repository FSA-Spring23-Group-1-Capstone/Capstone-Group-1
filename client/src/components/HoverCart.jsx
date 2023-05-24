import React, { useState } from "react";
import { getAllOrderItemsByOrderId } from "../api/orderItems";
import { ordersByCustomerEmail } from "../api/orders";
import { getGameByGameId } from "../api/games";


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
 
  const customerCart = allItemsOrders.forEach( async (order)=> {
    await getGameByGameId(order.productId)
    
  })
  console.log(customerCart)

  
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
      
    </div>
  );
};

export default HoverCart;
