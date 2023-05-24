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
  const response = await fetch(`${APIURL}/orders/${customerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};
