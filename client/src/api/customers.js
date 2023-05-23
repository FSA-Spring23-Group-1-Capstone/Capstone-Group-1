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
    console.log(response);
    const result = await response.json();
    console.log("BLAHHHHHHHHH", result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
