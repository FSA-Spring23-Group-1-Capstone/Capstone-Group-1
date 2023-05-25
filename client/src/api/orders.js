const APIURL = "http://localhost:8080/api";

export const ordersByCustomerEmail = async (email) => {
  const response = await fetch(`${APIURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const result = await response.json();
  return result;
};

export const currentOrderIdByCustomerId = async (customerId) => {
  console.log("INDICATOR!!!!!", customerId);
  const response = await fetch(`${APIURL}/orders/${customerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const createNewCustomerOrder = async (customerId) => {
  const response = await fetch(`${APIURL}/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({customerId: customerId})
  });
  const result = await response.json();
  return result;
};

export const setOrderCompleted = async (orderId) => {
  const response = await fetch(`${APIURL}/orders/complete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({orderId: orderId})
  });
  const result = await response.json();
  return result;
};
