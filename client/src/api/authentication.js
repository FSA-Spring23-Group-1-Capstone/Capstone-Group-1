const APIURL = "api";

export const authenticateNewCustomer = async ({
  name,
  email,
  password,
  address,
}) => {
  try {
    const response = await fetch(`${APIURL}/customer/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, address }),
    });

    const result = await response.json();

    const { token, customer, message } = result;
    if (token) {
      localStorage.setItem("token", token);
      return { customer, token, message };
    }
    if (!token) {
      return { message };
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

export const authenticateCustomer = async (email, password) => {
  try {
    const response = await fetch(`${APIURL}/customer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    const { token, customer, message } = result;
    if (token) {
      localStorage.setItem("token", token);
      return { customer, token, message };
    }
    if (!token) {
      return { message };
    }
    return;
  } catch (error) {
    console.error(error);
  }
};
