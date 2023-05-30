import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";

const Checkout = ({ customer, token, allGames, orderItems, orderId, setOrderItems, setOrderId }) => {
  const [displayForm, setDisplayForm] = useState(false)

  const purchaseArr = orderItems.map(
    (order) => order.purchasePrice * order.quantity
  );
  const sumItems = (arr) => {
    let total = 0;
    for (let index = 0; index < arr.length; index++) {
      total = total + arr[index];
    }

    return total;
  };
  let total = sumItems(purchaseArr);

  return (
    <>
      <div className="checkoutTitle">
        <h2>Checkout</h2>
      </div>
      <div>
        <section className="userCheckoutInfo">
          <h3>Ready to check out {customer.name}?</h3>
          <p>Username: {customer.email}</p>
          <p>Address: {customer.address}</p>
        </section>
      </div>
      <div>
        <h3 className="cartItems">Cart Items</h3>
        <section className="checkoutItems">
          {orderItems.map((item, index) => {
            const currentGame = allGames.filter(
              (game) => game.id === item.productId
            );
            return (
              <article className="checkoutItem" key={currentGame[0].id}>
                <img src={currentGame[0].imageUrl} alt={currentGame[0].name} />
                <p>{currentGame[0].name}</p>
                <p>{currentGame[0].price}</p>
                <p>{orderItems[index].quantity}</p>
              </article>
            );
          })}
        </section>
        <section>
          <div className="orderup">
          <h3>Order Summary</h3>
          <h4>Subtotal: ${total}</h4>
          <h2>Shipping & Handling FREE</h2>
          {displayForm ? (
              <CheckoutForm customer={customer} orderId={orderId} setOrderItems={setOrderItems} setOrderId={setOrderId}/>
          ) : (
            <></>
          )
          }
          <button onClick={() => {
            setDisplayForm(!displayForm)
          }}
          >
            Purchase Form
          </button>
          </div>
        </section>
      </div>
    </>
  );
};
//Show payment form
//Set isCompleted to true
//Create new order for customer

export default Checkout;
