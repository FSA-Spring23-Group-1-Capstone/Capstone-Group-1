
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { ordersByCustomerEmail } from "../api/orders";
import { getAllOrderItemsByOrderId } from "../api/orderItems";

const Checkout = ({customer, token, allGames}) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(()=> {
    const getCustomerOrder = async () => {
      const customerOrder = await ordersByCustomerEmail(customer.email)
      const fetchedOrderItems = await getAllOrderItemsByOrderId(customerOrder.id, token)
      setOrderItems(fetchedOrderItems)
    }
  
    getCustomerOrder()
  },[])


  return (
  <>
    <div>
      <h2>Checkout</h2>
    </div>
    <div>
      <section className="userCheckoutInfo">
        <h3>Account Details</h3>
        <p>Name: {customer.name}</p>
        <p>Name: {customer.email}</p>
        <p>Address: {customer.address}</p>
      </section>
    </div>
    <div>
        <h3>Cart Items</h3>
      <section className="checkoutItems">
        {orderItems.map((item) => {
          const currentGame = allGames.filter((game) => game.id === item.productId)
          return (
            <article className="checkoutItem">
              <img src={currentGame[0].imageUrl} alt={currentGame[0].name} />
              <p>{currentGame[0].name}</p>
              <p>{currentGame[0].price}</p>
            </article>
          )
        })}

      </section>
    </div>

  
  
  </>
  )

};

export default Checkout;
