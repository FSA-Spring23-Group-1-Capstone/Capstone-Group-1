import React, { useState, useEffect } from "react";
import { createNewCustomerOrder, ordersByCustomerEmail, setOrderCompleted } from "../api/orders";

const CheckoutForm = ({customer}) => {
    const [orderId, setOrderId] = useState("")

    useEffect(() => {
        const getCustomerOrder = async () => {
          const customerOrder = await ordersByCustomerEmail(customer.email)
          setOrderId(customerOrder.id);
        };
    
        getCustomerOrder();
      }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const completedOrder = await setOrderCompleted(orderId)
        console.log("LLLL", completedOrder)
        if(completedOrder.orderCompleted){
            const newCart = await createNewCustomerOrder(customer.id)
            console.log("newCart: ", newCart)
        }
        return completedOrder
    }
return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name"></input>
            <input type="text" placeholder="Card Number"></input>
            <input type="text" placeholder="Security Code"></input>
            <button type="submit">Checkout</button>
        </form>
    </>
)
}

export default CheckoutForm