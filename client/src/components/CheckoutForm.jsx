import React from "react";
import {
  createNewCustomerOrder,
  ordersByCustomerEmail,
  setOrderCompleted,
} from "../api/orders";
const CheckoutForm = ({ customer, orderId, setOrderItems, setOrderId }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const completedOrder = await setOrderCompleted(orderId);
    setOrderItems([]);
    console.log("LLLL", completedOrder);
    if (completedOrder.orderCompleted) {
      const newCart = await createNewCustomerOrder(customer.id);
      const customerOrders = await ordersByCustomerEmail(customer.email);
      const cartNum = customerOrders.filter(
        (order) => order.orderCompleted === false
      );
      console.log("new cart", cartNum);
      setOrderId(cartNum[0].id);
      setOrderItems([]);
    }
    return completedOrder;
  };
  return (
    <>
      <form className="check-form" onSubmit={handleSubmit}>
        <input className="form-inputs" type="text" placeholder="Name"></input>
        <input
          className="form-inputs"
          type="text"
          placeholder="Card Number"
        ></input>
        <input
          className="form-inputs"
          type="text"
          placeholder="Security Code"
        ></input>
        <button className="checkout-button" type="submit">
          Checkout
        </button>
      </form>
    </>
  );
};
export default CheckoutForm;
