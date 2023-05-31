import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
const Checkout = ({
  customer,
  token,
  allGames,
  orderItems,
  orderId,
  setOrderItems,
  setOrderId,
}) => {
  const [displayForm, setDisplayForm] = useState(false);
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
      <div className="checkoutTitle"></div>
      <div className="master-container">
        <div className="left-contianer">
          <section className="user-checkout-info">
            <p className="checkoutTitle">Checkout</p>
            <h3 className="checkout-question">
              Ready to check out {customer.name}?
            </h3>
            <p className="details-address">Username: {customer.email}</p>
            <p className="details-address">Address: {customer.address}</p>
          </section>
          <section className="main-container">
            <h3 className="cartItems">Shopping Cart</h3>
            <table className="table-container">
              <th>
                <tr className="table-row">
                  <td className="row-item"></td>
                  <td className="row-item">Game</td>
                  <td className="row-item">Price</td>
                  <td className="row-item">Quantity</td>
                </tr>
              </th>
              <tbody>
                {orderItems.map((item, index) => {
                  const currentGame = allGames.filter(
                    (game) => game.id === item.productId
                  );
                  return (
                    <tr className="table-row" key={currentGame[0].id}>
                      <td className="row-item">
                        <img
                          src={currentGame[0].imageUrl}
                          alt={currentGame[0].name}
                        />
                      </td>
                      <td className="row-item">{currentGame[0].name}</td>
                      <td className="row-item">{currentGame[0].price}</td>
                      <td className="row-item">{orderItems[index].quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
        <section className="right-contianer">
          <div className="orderup">
            <p className="order-title">Order Summary</p>
            <hr />
            <p className="sub-total">
              Subtotal: <span className="total-price">${total}</span>
            </p>
            <hr />
            <p className="shipping">Shipping & Handling: Free</p>
            {displayForm ? (
              <CheckoutForm
                customer={customer}
                orderId={orderId}
                setOrderItems={setOrderItems}
                setOrderId={setOrderId}
              />
            ) : (
              <></>
            )}
            <button
              className="purchase"
              onClick={() => {
                setDisplayForm(!displayForm);
              }}
            >
              Enter Payment Details
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
