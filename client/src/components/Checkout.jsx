import React from "react";
import { getAllOrderItemsByOrderId } from "../api/orderItems";
import { currentOrderIdByCustomerId } from "../api/orders";

const Checkout = ({ customer, token }) => {
  console.log("BLUEEEE", customer);
  const { id } = customer;
  console.log("IDIDIDIDIDID", id);
  const getOrder = async () => {
    const customerOrders = await currentOrderIdByCustomerId(id);

    return customerOrders;
  };

  const orderId = getOrder();
  console.log(orderId);
  const orderItems = getAllOrderItemsByOrderId(orderId, token);
  return (
    <>
      <h2>Checkout</h2>
      <div>
        <div>
          <h3>Customer Details</h3>
          <p>Name: {customer.name}</p>
          <p>Address: {customer.address}</p>
        </div>

        {/* <table>
          <tr></tr>
        </table> */}
      </div>
    </>
  );
};

export default Checkout;
