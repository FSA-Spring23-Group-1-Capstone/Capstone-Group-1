const APIURL = "http://localhost:8080/api";

export const fetchItem = async (
  customerId,
  productId,
  quantity,
  purchasePrice,
  token
) => {
  console.log(
    "here are props: ",
    customerId,
    productId,
    quantity,
    purchasePrice
  );
  try {
    const response = await fetch(`${APIURL}/orders/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ customerId, productId, quantity, purchasePrice }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrderItemsByOrderId = async (orderId, token) => {
  try {
    const response = await fetch(`${APIURL}/orderitems/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {}
};
