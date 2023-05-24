const APIURL = "http://localhost:8080/api";

export const getMe = async (token) => {
  try {
    const response = await fetch(`${APIURL}/customer/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};
